const mongoose = require('../db/connection')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  completed: {
    type: Boolean,
    default: false
  },
  location: {
    type: String
  }
})

module.exports = mongoose.model('Item', itemSchema)
