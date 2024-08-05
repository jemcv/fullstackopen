const blogRouter = require('express').Router()
const Blog = require('../models/blog')
//const User = require('../models/user')
//const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Bad Request' })
  }

  try {
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  try {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    if (blog.user.toString() === user.id) {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    } else {
      return response.status(401).json({ error: 'Unauthorized access' })
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body

  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })

    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = blogRouter