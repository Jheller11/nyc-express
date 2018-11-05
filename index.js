const app = require('express')()
const parser = require('body-parser')
const cors = require('cors')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const itemController = require('./controllers/items')
const userController = require('./controllers/users')

// config middleware
app.use(cors())
app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// passport
app.use(session({ secret: 'j' }))
app.use(passport.initialize())
app.use(passport.session())

// controllers
app.use('/items', itemController)
app.use('/users', userController)

app.get('/error', (req, res) => {
  res.send('error')
})

app.get('/success', (req, res) => {
  res.send('success')
})

app.get('/', (req, res) => {
  res.send('hello')
})

// fix later to deploy
app.set('port', 3001)

app.listen(app.get('port'), () => {
  console.log(`App running on port: ${app.get('port')}`)
})
