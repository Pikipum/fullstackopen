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

test('blogs can be added', async () => {
    const blogsBefore = await api.get('/api/blogs')

    const newBlog = {
        'id': "1234567789",
        'title': "Testing API",
        'author': "John Tester",
        'blogUrl': "https://testingstuff.com/",
        'votes': 7,
        '__v': 0
    }

    await api.post('/api/blogs').send(newBlog)
        .expect(201)

    const blogsAfter = await api.get('/api/blogs')
    assert.strictEqual(blogsAfter.body.length, blogsBefore.body.length + 1)

})

test('adding blog with no votes value sets votes to 0', async () => {

    const blogWithNoVotes = {
        'id': "1234567789",
        'title': "Testing API",
        'author': "John Tester",
        'blogUrl': "https://testingstuff.com/"
    }

    response = await api.post('/api/blogs').send(blogWithNoVotes)

    assert.strictEqual(response.body.votes, 0)
})

after(async () => {
    await mongoose.connection.close()
})