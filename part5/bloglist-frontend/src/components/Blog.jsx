import { useState, useEffect } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)
  const [userLikes, setUserLikes] = useState(blog.likes)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    setIsOwner(blog.user.username === username)
  }, [username, blog.user.username])

  const addLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: userLikes + 1,
      user: blog.user.id,
    }
    try {
      await updateBlog(updatedBlog)
      setUserLikes(userLikes + 1)
    } catch (error) {
      console.error('error updating likes:', error)
    }
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id, blog)
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} - author: {blog.author}
      </div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div>
          <a href={blog.url}>
            {blog.url}
          </a>
          <div>
            likes {userLikes}{' '}
            <button onClick={addLike}>
              Like
            </button>
          </div>
          <div>{blog.user.username}</div>
          {isOwner && (
            <button onClick={handleDelete}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog