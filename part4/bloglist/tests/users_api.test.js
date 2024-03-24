const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
})
const users = [
    {
        name: "John Doe",
        username: "johndoe",
        password: "password"
    }
]

test('users are returned as json', async () => {
    await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('user is created successfully', async () => {
    const newUser = {
        name: "John Doe",
        username: "john doe",
        password: "password"
    }
    
    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
        assert.strictEqual(response.body.username, newUser.username)
    })
})

test('user is not created if username is less than 3 characters', async () => {
    const newUser = {
        name: "John Doe",
        username: "jo",
        password: "password"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
        assert.strictEqual(response.body.error, 'username must be at least 3 characters long')
    })
})

test('user is not created if password is less than 3 characters', async () => {
    const newUser = {
        name: "John Doe",
        username: "johndoe",
        password: "pa"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
        assert.strictEqual(response.body.error, 'password must be at least 3 characters long')
    })
})

test('username must be unique', async () => {
    const newUser = {
        name: "John Doe",
        username: "johndoe",
        password: "password"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
        assert.strictEqual(response.body.error, 'username must be unique')
    })
})

after(async () => {
    await mongoose.connection.close()
})