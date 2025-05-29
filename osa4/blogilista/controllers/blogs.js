const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
  */

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.votes) {
    blog['votes'] = 0
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'UserID missing or not valid' })
  }

  blog.user = user._id

  logger.info(request.body)
  logger.info(blog)

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(result)
  } catch (err) {
    response.status(400).json(err)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { author, title, blogUrl, votes } = request.body

  if (!blogUrl || !title) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  await Blog.findByIdAndUpdate(
    request.params.id,
    { author, title, blogUrl, votes },
    { new: true, runValidators: true, context: 'query' }
  )
  response.status(200).end()
})


module.exports = blogsRouter