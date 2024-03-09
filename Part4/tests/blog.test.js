const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const bloglist = require('../models/bloglist');
const bcrypt = require('bcrypt');
const api = supertest(app);
const User = require('../models/user');
const helper = require('../utils/list_helper');
const assert = require('assert');

beforeAll(async () => {
  // Any setup code if needed before running tests
});

test('GET /api/blogs should return correct number of blog posts in JSON format', async () => {
  const response = await api.get('/api/blogs');

  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(10);

  response.body.forEach((blogPost) => {
    expect(blogPost.id).toBeDefined();
  });
});

test('POST /api/blogs should add to the blog list and total count should be +1', async () => {
  const initialResponse = await api.get('/api/blogs');
  const initialBlogCount = initialResponse.body.length;
  
  const newBlogData = {
    title: 'a',
    author: 'abcc',
    url: 'ab.com',
  }

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlogData);
  
  expect(postResponse.status).toBe(200); 
  expect(postResponse.body.id).toBeDefined(); 

  const expectedLikes = postResponse.body.likes || 0;
  expect(expectedLikes).toBe(0);

  const finalResponse = await api.get('/api/blogs');
  const finalBlogCount = finalResponse.body.length;

  expect(finalBlogCount).toBe(initialBlogCount + 1);
}, 10000); // Increase timeout to 10 seconds

test('POST /api/blogs should return 400 Bad Request if title is missing', async () => {
  const newBlogData = {
    author: 'abcc',
    url: 'ab.com',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlogData);

  expect(response.status).toBe(400);
});

test('POST /api/blogs should return 400 Bad Request if url is missing', async () => {
  const newBlogData = {
    title: 'a',
    author: 'abcc',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlogData);

  expect(response.status).toBe(400);
});

test('DELETE /api/blogs should delete item from the blog list', async () => {
  const newBlog = await bloglist.create({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'testurl.com'
  });

  const response = await api
    .delete(`/api/blogs/${newBlog._id}`)

  expect(response.status).toBe(204)

  const deletedBlog = await bloglist.findById(newBlog._id)
  expect(deletedBlog).toBeNull();
});

test('PUT /api/blogs/:id should update the information of an individual blog post', async () => {
  const newBlog = await bloglist.create({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'testurl.com',
    likes: 0 
  });

  const updatedLikes = 10; 

  const response = await api.put(`/api/blogs/${newBlog._id}`).send({ likes: updatedLikes });

  expect(response.status).toBe(200);

  const updatedBlog = await bloglist.findById(newBlog._id);
  expect(updatedBlog.likes).toBe(updatedLikes);
});

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})

test('POST /api/users should return 400 Bad Request if username is less than 3 characters', async () => {
  const newUser = {
    username: 'ab',
    name: 'Test User',
    password: 'password123',
  };

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400);
});

test('POST /api/users should return 400 Bad Request if password is less than 3 characters', async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'pw',
  };

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400);
});

test('POST /api/users should return 400 Bad Request if username is not unique', async () => {
  const existingUser = new User({
    username: 'existinguser',
    name: 'Existing User',
    password: 'password123',
  });
  await existingUser.save();

  const newUser = {
    username: 'existinguser',
    name: 'New User',
    password: 'password123',
  };

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400);
});



afterAll(async () => {
  await mongoose.connection.close();
});
