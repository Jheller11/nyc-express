const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

module.exports = passport => {
  passport.serializeUser((user, done) => {
    console.log('serialize')
    console.log(user)
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    console.log('deserialize')
    console.log(id)
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        process.nextTick(() => {
          User.findOne({ email: email }, (err, user) => {
            if (err) {
              console.log(err)
              return done(err)
            }
            if (user) {
              console.log(user + 'There is a user')
              return done(null, false)
            }
            if (!email || !password) {
              console.log(email, password, 'One of these is missing')
              return done(null, false)
            } else {
              var newUser = new User()
              newUser.email = email
              newUser.password = newUser.generateHash(password)
              newUser.name.first = req.body.firstname
              newUser.name.last = req.body.lastname
              console.log(newUser)
              newUser.save(err => {
                if (err) throw err
                return done(null, newUser)
              })
            }
          })
        })
      }
    )
  )
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            return done(err)
          }
          if (!user) {
            return done(null, false, { message: 'No user found' })
          }
          if (!user.validPassword(password, user)) {
            return done(null, false, {
              message: 'Invalid password. Please try again.'
            })
          }
          return done(null, user, { message: 'Success' })
        })
      }
    )
  )
}
