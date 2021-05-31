const config = require('../utils/config')
const logoutRouter = require('express').Router()

logoutRouter.get('/', async (req, res) => {
  req.session.destroy()
  console.log('express session destroyed')
  res.status(200).send({ logoutURI: config.logoutURI })
})

module.exports = logoutRouter