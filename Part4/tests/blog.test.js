const supertest = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');

beforeAll(async () => {
});

test('GET /api/blogs should return correct number of blog posts in JSON format', async () => {
  const response = await supertest(app).get('/api/blogs');

  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(10);

  response.body.forEach((blogPost) => {
    expect(blogPost.id).toBeDefined();
  });
});

test('POST /api/blogs should add to the blog list and total count should be +1', async () => {
    const initialResponse = await supertest(app).get('/api/blogs');
    const initialBlogCount = initialResponse.body.length;
  

    const newBlogData = {
        title: 'a',
        author: 'abcc',
        url: 'ab.com',
        }

    const postResponse = await supertest(app)
      .post('/api/blogs')
      .send(newBlogData);
    
    expect(postResponse.status).toBe(200); 
    expect(postResponse.body.id).toBeDefined(); 
  

    const expectedLikes = postResponse.body.likes || 0;
    expect(expectedLikes).toBe(0);

    const finalResponse = await supertest(app).get('/api/blogs');
    const finalBlogCount = finalResponse.body.length;
  
    expect(finalBlogCount).toBe(initialBlogCount + 1);
  });


  test('POST /api/blogs should return 400 Bad Request if title is missing', async () => {
    const newBlogData = {
      author: 'abcc',
      url: 'ab.com',
    };
  
    const response = await supertest(app)
      .post('/api/blogs')
      .send(newBlogData);
  
    expect(response.status).toBe(400);
  });
  
  test('POST /api/blogs should return 400 Bad Request if url is missing', async () => {
    const newBlogData = {
      title: 'a',
      author: 'abcc',
    };
  
    const response = await supertest(app)
      .post('/api/blogs')
      .send(newBlogData);
  
    expect(response.status).toBe(400);
  });


afterAll(async () => {
  await mongoose.connection.close();
});
