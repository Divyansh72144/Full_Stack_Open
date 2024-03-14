import React, { useState } from 'react';
import blogService from '../services/blogs';

const AddBlogForm = ({ setBlogs, setNotificationMessage, setErrorMessage }) => {
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      author,
      url,
      title
    };
    try {
      await blogService.createBlog(newBlog);
      setAuthor('');
      setUrl('');
      setTitle('');
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
      setNotificationMessage('Success: Blog created');
    } catch (error) {
      console.error('Error creating blog:', error);
      setErrorMessage('Error: Failed to create blog');
    }
    setTimeout(() => {
      setNotificationMessage(null);
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddBlogForm;
