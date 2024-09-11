import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState(null)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      })
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setStatus('success')
      setMessage('Login successful')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setStatus('error')
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    setBlogs([])
    setStatus('success')
    setMessage('Logged out successfully')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setStatus('success')
      setMessage(`A new blog "${newBlog.title}" by ${newBlog.author} added`)
      setFormVisible(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setStatus('error')
      setMessage('error creating blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.error('error creating blog:', error)
    }
  }

  const handleUpdateBlog = async (updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
      setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? returnedBlog : blog)))
    } catch (error) {
      console.error('error updating blog:', error)
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (error) {
      console.error('error deleting blog:', error)
    }
  }

  if (user === null) {
    return <LoginForm handleLogin={handleLogin} message={message} status={status} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} status={status} />
      {user.name} logged in<button id="logout-button" onClick={handleLogout}>logout</button>
      <Togglable
        buttonLabel="create new"
        cancelLabel="cancel"
        visible={formVisible}
        setVisible={setFormVisible}
      >
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={handleUpdateBlog}
          deleteBlog={handleDeleteBlog}
          username={user.username}
        />
      ))}
    </div>
  )
}

export default App