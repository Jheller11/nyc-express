const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

// delete an item
router.delete('/:id', (req, res) => {
  Item.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.redirect('/')
  })
})

// edit an item
router.put('/:id', (req, res) => {
  Item.findOneAndUpdate({ _id: req.params.id }, req.body).then(item => {
    res.redirect('/')
  })
})

// get all items
router.get('/', (req, res) => {
  Item.find({}).then(items => {
    res.json(items)
  })
})

module.exports = router
