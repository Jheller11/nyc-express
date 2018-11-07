const app = require('express')()
const parser = require('body-parser')
const cors = require('cors')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const itemController = require('./controllers/items')
const userController = require('./controllers/users')
const cookieParser = require('cookie-parser')
require('./config/passport')(passport)

// config middleware
app.use(cors())
app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(cookieParser())

// passport
app.use(session({ secret: 'j' }))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log('Session:')
  console.log(req.session)
  console.log('req.body:')
  console.log(req.body)
  console.log(req.isAuthenticated())
  next()
})

// controllers
app.use('/items', itemController)
app.use('/users', userController)

app.get('/', (req, res) => {
  res.send('hello')
})

// fix later to deploy
app.set('port', 3001)

app.listen(app.get('port'), () => {
  console.log(`App running on port: ${app.get('port')}`)
})
