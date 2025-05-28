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

  const result = await blog.save()
  response.status(201).json(result)
})


module.exports = blogsRouter