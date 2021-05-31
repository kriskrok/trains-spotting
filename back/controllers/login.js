const https = require('https')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
const User = require('../models/user')
const config = require('../utils/config')
const loginRouter = require('express').Router()

loginRouter.get('/oauth', async (req, response) => {
  response
    .status(200)
    .send({ url: `https://localhost:${config.SSOAuthPort}/uas/oauth2/authorization?response_type=code&scope=openid&client_id=${config.clientID}&redirect_uri=${config.RedirectURI}` })
})

loginRouter.get('/oauth-callback', async (req, res) => {

  let payload = {
    'grant_type': 'authorization_code',
    'redirect_uri': config.RedirectURI,
    'code': req.query.code,
    'client_id': config.clientID,
    'client_secret': config.clientSecret
  }

  await fetch(`https://localhost:${config.SSOAuthPort}/uas/oauth2/token`, {
    method: 'POST',
    body: new URLSearchParams(payload),
    agent: new https.Agent({ rejectUnauthorized: false }) //local env has self-signed certificates
  }).then(response => response.json())
    .then(data => {
      //Token response consists of data.[access_token|scope|id_token|token_type|expires_in]
      req.session.token = data.access_token
      req.session.id_token = data.id_token

      let { session_index } = jwt.decode(data.id_token)
      req.session.session_index = session_index

      // Redirect here for a family friendly CORS redirection debugging exercise
    })
    .catch((error) => {
      console.error('Something went awry with requesting access token, error:', error)
    })
  // OBSERVERA: this _needs_ to be here, not six rows up
  res.redirect('http://localhost:3000')

  /* How to redirect without invoking CORS 101:
   ********************************************
   * res.setHeader('Location', url)
   * res.setHeader('Content-Length', '0')
   * res.set({ 'X-Redirect': url })
   * res.sendStatus(200)
   */
})

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter