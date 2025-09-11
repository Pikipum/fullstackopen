const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    minlength: 5
  },
  title: {
    type: String,
    minlength: 3,
    required: true
  },
  published: {
    type: Number,
    minlength: 4,
    required: true
  },
  genres: [
    {
      type: String
    }
  ]
})

module.exports = mongoose.model('Book', schema)