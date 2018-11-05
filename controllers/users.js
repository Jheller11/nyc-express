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

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  console.log(req.user, req.session.passport.user)
  res.send('done')
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
