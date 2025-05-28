const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

test('right amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body.length)

    assert.strictEqual(response.body.length, 1)
})

after(async () => {
    await mongoose.connection.close()
})