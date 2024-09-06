import { useState } from 'react'

const BlogForm = ({ handleCreateBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleCreateBlog({ title: newTitle, author: newAuthor, url: newUrl })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title
            <input
              type="text"
              value={newTitle}
              name="Title"
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={newAuthor}
              name="Author"
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={newUrl}
              name="Url"
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm