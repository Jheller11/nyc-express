const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/User')
require('../config/passport')

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    res.json(user)
  })
})

module.exports = router
