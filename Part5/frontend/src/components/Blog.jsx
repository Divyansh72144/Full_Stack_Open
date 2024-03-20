/* eslint-disable react/prop-types */
import Togglable from "./Toggable";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
    const [likes, setLikes] = useState(blog.likes);

    const handleLike = async () => {
      const updatedBlog = { ...blog, likes: likes + 1 };
      try {
        await blogService.updateBlog(updatedBlog);
        setLikes(likes + 1);
      } catch (error) {
        console.error("Failed to like the blog:", error);
      }
    };

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
            <p>Likes: {blog.likes}</p><button onClick={handleLike}>Like</button>
          </div>
        </Togglable>
      </div>
    );
  };

export default Blog;