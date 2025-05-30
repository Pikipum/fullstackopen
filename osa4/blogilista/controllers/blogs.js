const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.votes) {
    blog['votes'] = 0
  }

  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'UserID missing or not valid' })
  }

  blog.user = request.user.id

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

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'UserID missing or not valid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(400).json({ error: 'invalid user' })
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { author, title, blogUrl, votes } = request.body

  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'UserID missing or not valid' })
  }
  if (user.name != author) {
    return response.status(400).json({ error: 'invalid user' })
  }

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