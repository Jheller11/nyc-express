const mongoose = require('mongoose')
mongoose.Promise = Promise

mongoose.connect('mongodb://localhost/nyc')

module.exports = mongoose
