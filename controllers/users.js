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

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/users/:id',
    failureRedirect: '/users/login'
  })
)

router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/users/:id',
    failureRedirect: '/users/signup'
  })
)

module.exports = router
