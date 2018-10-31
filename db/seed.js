const mongoose = require('./connection')
const seeds = require('./seeds.json')

// require models
const Item = require('../models/Item')
const User = require('../models/User')

Item.remove({})
  .then(() => {
    User.remove({})
  })
  .then(() => {
    User.insertMany(seeds)
  })
  .then(() => {
    Item.insertMany(seeds)
  })
  .then(() => {
    console.log('completed')
    mongoose.connection.close()
  })
