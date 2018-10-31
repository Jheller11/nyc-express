const app = require('express')()
const parser = require('body-parser')
const cors = require('cors')
const methodOverride = require('method-override')

// config middleware
app.use(cors())
app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('hello')
})

app.set('port', 3001)

app.listen(app.get('port'), () => {
  console.log(`App running on port: ${app.get('port')}`)
})
