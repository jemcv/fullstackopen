const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, likes: 1});
    response.json(users);
});

userRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  if (username.length < 3) {
    return response.status(400).json({
      error: 'username must be at least 3 characters long'
    });
  } else if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    });
  }

  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return response.status(400).json({
        error: 'username must be unique'
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    });
    
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }

});

module.exports = userRouter;