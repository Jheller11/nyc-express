const mongoose = require('../db/connection')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    first: {
      required: true,
      type: String
    },
    last: {
      required: true,
      type: String
    }
  }
})

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = (password, user) => {
  return bcrypt.compareSync(password, user.local.password)
}

module.exports = mongoose.model('User', userSchema)
