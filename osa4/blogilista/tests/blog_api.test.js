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

    await api.post('/api/blogs').send(helper.testBlog)
        .expect(201)

    const blogsAfter = await api.get('/api/blogs')
    assert.strictEqual(blogsAfter.body.length, blogsBefore.body.length + 1)

})

test('adding blog with no votes value sets votes to 0', async () => {
    response = await api.post('/api/blogs').send(helper.blogWithNoVotes)
    assert.strictEqual(response.body.votes, 0)
})

test('adding blog with no url receives 400 Bad Request', async () => {
    await api.post('/api/blogs').send(helper.blogWithNoUrl)
        .expect(400)
})

test('adding blog with no title receives 400 Bad Request', async () => {
    await api.post('/api/blogs').send(helper.blogWithNoTitle)
        .expect(400)
})

test('deleting a blog by id returns 204', async () => {
    const blogsBefore = await api.get('/api/blogs')
    await api.delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .expect(204)
    const blogsAfter = await api.get('/api/blogs')
 
    assert.strictEqual(blogsBefore.body.length, blogsAfter.body.length + 1)
})

after(async () => {
    await mongoose.connection.close()
})