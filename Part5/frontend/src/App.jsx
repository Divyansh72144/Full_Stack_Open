import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/blogs'
import './App.css'
import LoginForm from './components/Login'
import Togglable from './components/Toggable'
import AddBlogForm from './components/addBlog'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [notificationMessage,setNotificationMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [refreshBlog, setRefreshBlog] = useState(false)
  const [sortedBlogs, setSortedBlogs] = useState([])


  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
      sortBlogsByLikes()
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      loginService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage('Success: Successfully logged in')
    } catch (exception) {
      setNotificationMessage('Error: Username or Password is incorrect')
    }
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }


  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login ">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const addBlogForm = () => {
    return (
      <Togglable buttonLabel="Add New Blog">
        <AddBlogForm
          setBlogs={setBlogs}
          setNotificationMessage={setNotificationMessage}
          setErrorMessage={setErrorMessage}
        />
      </Togglable>
    )
  }

  const addLikes = async (id, blogObject) => {
    await blogService.updateBlog(id, blogObject)
    setRefreshBlog(!refreshBlog)
  }

  const sortBlogsByLikes = () => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
    setSortedBlogs(sorted)
  }

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
          <button onClick={handleLogout}>Logout</button>
          <div style={{ marginBottom: '15px' }} />
          {addBlogForm()}
          <h2>Blogs</h2>
          <button onClick={sortBlogsByLikes}>Sort by Likes</button>
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog}  addLikes={addLikes}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
