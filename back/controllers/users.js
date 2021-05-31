const https = require('https')
const bcrypt = require('bcrypt')
const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')
const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map(u => u.toJSON()))
})

usersRouter.get('/id-token', async (req, res) => {
  if (!req.session.id_token) {
    console.log('Unable to find id-token from express session')
    res.send({}).end()
  }
  try {
    let { surname, name, email } = jwt.decode(req.session.id_token)

    res.send({ 'id_token': req.session.id_token,
      'claims': { 'name': name[0], 'surname': surname[0], 'email': email[0] }
    })
  } catch (er) {
    console.error('\nError encountered in /id-token\n',er)
  }
})

usersRouter.get('/protected', async (req, res) => {
  if (!req.session.token) {

    // Missing token - send nothing
    console.error('Access token missing')
    res.send({}).end()
    return
  }

  const userinfo = await fetch(`https://localhost:${config.SSOAuthPort}/uas/oauth2/userinfo`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.session.token}`
    },
    //local enviroment uses self-signed certificates
    agent: new https.Agent({ rejectUnauthorized: false })
  }).then(response => response.json())
    .catch((error) => {
      console.error('Could not retrieve userAttributes, error:', error)
    })

  const userAttr = {
    name: userinfo.name[0],
    surname: userinfo.surname[0],
    email: userinfo.email[0]
  }
  res.send(userAttr).end()
})

usersRouter.get('/session-index', async (req, res) => {
  res.send({ 'index': req.session.session_index })
})

usersRouter.get('/token', async (req, res) => {
  res.send({ 'access_token': req.session.token })
})

usersRouter.get('/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
  if (!user) {
    console.error(`Could not find user with username '${req.params.username}'`)
    res.send({}).end()
    return
  }
  res.json(user.toJSON())
})

usersRouter.post('/', async (req, res) => {
  const { username, name, email, password } = req.body

  const body = req.body

  if (!body.password || body.password.length < 3) {
    const message = !body.password
      ? 'missing password field, thou shall provide a password'
      : 'invalid password, password has to be atleast 3 characters long'

    return res.status(400).json({
      error: `${message}`
    }).end()
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    email,
    passwordHash,
  })

  await user.save()
  res.status(204).end()
})

module.exports = usersRouter
