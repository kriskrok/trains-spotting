const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const Train = require('../models/train')
const User = require('../models/user')

const testTrains = [{ _id: 654321, name: 'Intercity 65', destination: 'Jyväskylä', speed: 123.45, coordinates: [60.5039, 25.1335] },
             { _id: 123456, name: 'Pendolino 6', destination: 'Oulu', speed: 13.46, coordinates: [12.5039, 25.1385] },
             { _id: 654123, name: 'Intercity 13', destination: 'Kajaani', speed: 130.60, coordinates: [59.5039, 25.1345] },
             { _id: 132321, name: 'R-juna', destination: 'Vaala', speed: 111.45, coordinates: [55.5039, 25.1375] }, ]

let token

describe('when there is initially some trains saved', () => {
  beforeEach(async () => {
    await Train.deleteMany({})
    await Train.insertMany(testTrains)

    await User.deleteMany({})
    await api
      .post('/api/users')
      .send({ username: 'Maija', name: 'Maija Mehiläinen', email: 'porriainen@email.com', password: 'sateenvarjokala' })

    const res = await api
      .post('/api/login')
      .send({ username: 'Maija', password: 'sateenvarjokala' })

    token = 'bearer '.concat(res.body.token)
  })

  test('trains are returned as json', async () => {
    await api
      .get('/trains')
      .set('authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all trains are returned', async () => {
    const response = await api.get('/trains').set('Authorization', token)

    expect(response.body).toHaveLength(testTrains.length)
  })

  test('a specific train is within the returned trains', async () => {
    const response = await api.get('/trains').set('Authorization', token)

    const names = response.body.map(t => t.name)
    expect(names).toContain('R-juna')
  })

  test('trains have an ID', async () => {
    const response = await api.get('/trains').set('Authorization', token)
    let train = response.body[0]

    expect(train).toHaveProperty('id')
    expect(train._id).toBeUndefined()
  })

  describe('addition of a new train', () => {
    test('succeeds with valid data', async () => {

      await api
        .get('/trains')
        .set('Authorization', token)

      const newTrain =  {
        _id: 132098,
        name: 'T-juna',
        destination: 'Jormua',
        speed: 111.45,
        coordinates: [55.5039, 25.1375]
      }

      await api
        .put(`/trains/${newTrain._id}/location`)
        .send(newTrain)
        .expect(201)

      const trainsAtEnd = await api
        .get('/trains')
        .set('Authorization', token)

      const names = trainsAtEnd.body.map(t => t.name)
      expect(names).toContain('T-juna')
    })
  })

  describe('removing a train', () => {
    test('succeeds with status code 204', async () => {
      await api
        .get('/trains')
        .set('Authorization', token)

      await api
        .delete(`/trains/${testTrains[0]._id}`)
        .expect(204)

      const trainsAtEnd = await api
        .get('/trains')
        .set('Authorization', token)

      const names = trainsAtEnd.body.map(t => t.name)
      expect(names).not.toContain(testTrains[0].name)

    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})