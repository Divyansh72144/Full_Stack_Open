const testingRouter = require('express').Router()
const Blog = require('../models/bloglist')

testingRouter.post('/', async (request, response) => {
  console.log('resetting database');
  await Blog.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter