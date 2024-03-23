import Togglable from './Toggable'
import blogService from '../services/blogs'

const Blog = ({ blog ,addLikes }) => {

  const handleLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    addLikes(blog.id, blogObject)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: '10px'
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <Togglable buttonLabel="View" hideButtonLabel="Hide" className="shown">
        <div>
          <p>URL: {blog.url}</p>
          <p style={{ display: 'inline' }}>Likes: {blog.likes}</p> <button id="Like-button" style={{ display: 'inline' }} onClick={handleLike}>Like</button>
          <p>Author: {blog.author}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog