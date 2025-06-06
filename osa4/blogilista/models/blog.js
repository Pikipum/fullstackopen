const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
  author: String,
  title: { type: String, required: true },
  blogUrl: { type: String, required: true },
  votes: {type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)