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
  },
  addedBy: {
    type: String,
    required: true
  },
  likes: {
    type: Array,
    default: []
  },
  link: {
    type: String
  },
  type: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Item', itemSchema)
