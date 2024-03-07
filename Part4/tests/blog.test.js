const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const bloglist = require('../models/bloglist');

const api = supertest(app);

beforeAll(async () => {
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
  });


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


  test('DELETE /api/blogs should delete item from the blog list', async()=>{

    const newBlog = await bloglist.create({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'testurl.com'
    });

    const response = await api
      .delete(`/api/blogs/${newBlog._id}`)

    expect(response.status).toBe(204)

    const deletedBlog=await bloglist.findById(newBlog._id)
    expect(deletedBlog).toBeNull();
  })

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

afterAll(async () => {
  await mongoose.connection.close();
});
