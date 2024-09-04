const BlogForm = ({ handleCreateBlog, newTitle, newAuthor, newUrl, setNewTitle, setNewAuthor, setNewUrl, setHidden }) => {
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleCreateBlog}>
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
