const router = require('express').Router()
const Train = require('../models/train')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Train.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
