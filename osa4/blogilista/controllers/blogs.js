const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.votes) {
    blog['votes'] = 0
  }

  logger.info(request.body)
  logger.info(blog)

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (err) {
    response.status(400).json(err)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


module.exports = blogsRouter