/* eslint-disable react/prop-types */
import Togglable from "./Toggable";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog ,addLikes}) => {

    const handleLike = () => {
      const blogObject = {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes + 1,
      }
      addLikes(blog.id, blogObject)
    }



    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: '10px'
      }

    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <Togglable buttonLabel="View" hideButtonLabel="Hide">
          <div>
            <p>URL: {blog.url}</p>
            <p style={{ display: 'inline' }}>Likes: {blog.likes}</p> <button style={{ display: 'inline' }} onClick={handleLike}>Like</button>
            <p>Author: {blog.author}</p>
          </div>
        </Togglable>
      </div>
    );
  };

export default Blog;