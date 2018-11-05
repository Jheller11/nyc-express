const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/User')
require('../config/passport')(passport)

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    res.json(user)
  })
})

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/success',
    failureRedirect: '/error'
  })
)

router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/success',
    failureRedirect: '/error'
  })
)

module.exports = router
