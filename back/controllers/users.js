const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
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
