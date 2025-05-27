const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
  author: String,
  title: String,
  blogUrl: String,
  votes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)