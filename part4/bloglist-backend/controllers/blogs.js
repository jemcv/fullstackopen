const blogRouter = require('express').Router()
const Blog = require('../models/blog')
//const User = require('../models/user')
//const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Bad Request' });
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  if (blog.user.toString() === user.id) {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  } else {
    return response.status(401).json({ error: 'Unauthorized' });
  }
});

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body;

  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });
  
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

module.exports = blogRouter