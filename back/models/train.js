const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const trainSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  destination: String,
  speed: Number,
  coordinates: [Number],
})

trainSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Train = mongoose.model('Train', trainSchema)

module.exports = Train