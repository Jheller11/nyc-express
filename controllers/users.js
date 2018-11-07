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

router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.send(info)
    }
    req.logIn(user, err => {
      if (err) {
        return next(err)
      }
      return res.send(user._id)
    })
  })(req, res, next)
})

router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/items',
    failureRedirect: '/items',
    failureFlash: true
  })
)

module.exports = router
