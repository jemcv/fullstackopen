const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const blogs = [
    {
      _id: "65f64ea29993bbf82f31d92b",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "Test",
      author: "jemcv",
      url: "jemcv.me",
      likes: 0,
      __v: 0
    },
   ]

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}) 

test('correct amount of blogs is returned', async () => {
    await api 
    .get('/api/blogs')
    .expect(response => {
      assert.strictEqual(response.body.length, blogs.length)
    })
})

test('unique identifier property of the blog posts is named id', async () => {
    await api
    .get('/api/blogs')
    .expect(response => {
      assert.strictEqual(response.body[0].id, blogs[0]._id)
    })
})

test('likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: "TESTTES123TTEST",
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
      assert.strictEqual(response.body.likes, 0)
    })
})

after(async () => {
    await mongoose.connection.close()
})