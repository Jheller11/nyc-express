const mongoose = require('./connection')
const seeds = require('./item_seeds.json')
const userSeeds = require('./user_seeds.json')

// require models
const Item = require('../models/Item')
const User = require('../models/User')

console.log(mongoose, seeds)

Item.deleteMany({})
  .then(() => {
    Item.collection.insertMany(seeds)
  })
  .then(() => {
    console.log('completed')
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })
