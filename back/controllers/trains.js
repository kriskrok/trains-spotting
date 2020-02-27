const trainsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Train = require('../models/train')

trainsRouter.get('/', async (req, res) => {
  const token = req.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const trains = await Train.find({})

  res.json(trains.map(train => train.toJSON()))
})

trainsRouter.get('/:id/location', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const result = await Train.findById(req.params.id)

  if(!result) {
    res.status(404).end()
  }

  res.json(result.toJSON())

})

trainsRouter.put('/:id/location', async (req, res) => {
  const { name, destination, speed, coordinates } = req.body

  const train = {
    _id: req.params.id,
    name,
    destination,
    speed,
    coordinates,
  }

  const updated = await Train.findById(req.params.id)
  await Train.findByIdAndUpdate(req.params.id, train, { new: true, upsert: true })

  if (!updated) {
    res.status(201).end()
  }
  res.status(200).end()
})

trainsRouter.delete('/:id', async (request, response) => {
  await Train.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = trainsRouter
