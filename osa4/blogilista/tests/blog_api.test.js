const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('right amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 6)
})

test('blogs have correct id field', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(Object.keys(response.body[0]).includes('id'), true)
})

after(async () => {
    await mongoose.connection.close()
})