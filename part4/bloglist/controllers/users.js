const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
require('express-async-errors');
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})
  
userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
 
  const user = new User({
    username, 
    name, 
    passwordHash
  })

  const savedUser = await user.save()

  console.log(passwordHash)
  response.status(201).json(savedUser);
});

module.exports = userRouter