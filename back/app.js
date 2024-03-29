const config = require('./utils/config')
const express = require('express')
const session = require('express-session')
require('express-async-errors')
const app = express()
const cors = require('cors')
const trainsRouter = require('./controllers/trains')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    logger.info(`connected to MongoDB, using ${result.connections[0].host} cluster for ${result.connections[0].name} collection`)
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(session(
  {
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto', //true for https, auto for content dependent
      httpOnly: true,
      maxAge: 3600000 //in milliseconds i.e. 60*60
    }
  }
))

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('build'))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/trains', trainsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
