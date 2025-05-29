const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.votes) {
    blog['votes'] = 0
  }
  const user = await User.findById(blog.user)
  if (!user) {
    return response.status(400).json({ error: 'User not found' })
  }
  
  blog.user = user

  logger.info(request.body)
  logger.info(blog)

  try {
    user.blogs = user.blogs.concat(blog.id)
    await user.save()
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