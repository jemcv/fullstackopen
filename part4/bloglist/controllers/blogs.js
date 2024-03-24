const blogRouter = require('express').Router()
require('express-async-errors');
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
  const { title, url } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'Bad Request' });
  }
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
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