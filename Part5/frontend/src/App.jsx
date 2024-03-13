import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/blogs'; 
import "./App.css"

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [notificationMessage,setNotificationMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      loginService.setToken(user.token);    
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      loginService.setToken(user.token); 
      setUser(user);
      setUsername('');
      setPassword('');
      setNotificationMessage(`Success: Successfully logged in`)
    } catch (exception) {
      setNotificationMessage(`Error: Username or Password is incorrect`)
    }
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

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
      setNotificationMessage(`Success: Blog created`); 
  
    } catch (error) {
      console.error('Error creating blog:', error);
      setNotificationMessage(`Error: Failed to create blog`); 
    }
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  return (
    <div>
    {notificationMessage && (
  <div className={`notification ${notificationMessage.includes('Success') ? 'success' : 'error'}`}>
      {notificationMessage}
      </div>
    )}
      {errorMessage && <div>{errorMessage}</div>}
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <p>{user.username} logged in!</p>
          <form onSubmit={handleCreateBlog}>
            <div>
              Author
              <input
                type="text"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              URL
              <input
                type="text"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <div>
              Title
              <input
                type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <button type="submit">Create</button>
          </form>
          <button onClick={handleLogout}>Logout</button>
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
