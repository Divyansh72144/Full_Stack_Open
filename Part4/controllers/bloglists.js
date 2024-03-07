const blogsRouter = require('express').Router();
const Blog = require('../models/bloglist');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post('/', (request, response, next) => {
  const { body } = request;

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and url are required fields.' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author || '', 
    url: body.url,
    likes: body.likes || 0, 
  });

  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog);
    })
    .catch((error) => next(error));
});

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { body } = request;
    const { id } = request.params;
    const { likes } = body;

    if (likes === undefined) {
      return response.status(400).json({ error: 'Likes field is required for updating.' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, { likes }, { new: true });

    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
})

module.exports = blogsRouter;
