import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import BlogForm from '../src/components/BlogForm'
import { vi } from 'vitest'

test('Make a test, which checks that the component displaying a blog renders the blog\'s title and author, but does not render its URL or number of likes by default.', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    user: {
      username: 'testuser'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})

test('Make a test, which checks that the blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked.', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser'
    }
  }

  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()

  expect(container).not.toHaveTextContent('http://testurl.com')
  expect(container).not.toHaveTextContent('likes 5')

  const button = screen.getByText('view')
  await user.click(button)

  expect(container).toHaveTextContent('http://testurl.com')
  expect(container).toHaveTextContent('likes 5')
})

test('Make a test, which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.', async () => {
  const mockUpdateBlog = vi.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser'
    }
  }

  const user = userEvent.setup()

  render(<Blog blog={blog} updateBlog={mockUpdateBlog} username="testuser" />)

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
})

test('Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created.', async () => {
  const handleCreateBlog = vi.fn()
  const user = userEvent.setup()

  render(
    <BlogForm
      handleCreateBlog={handleCreateBlog}
    />
  )

  const titleField = screen.getByLabelText('title')
  const authorField = screen.getByLabelText('author')
  const urlField = screen.getByLabelText('url')
  const submitButton = screen.getByText('create')

  await user.type(titleField, 'Test Title')
  await user.type(authorField, 'Test Author')
  await user.type(urlField, 'http://testurl.com')
  await user.click(submitButton)

  expect(handleCreateBlog).toHaveBeenCalledTimes(1)
  expect(handleCreateBlog.mock.calls[0][0]).toEqual({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://testurl.com',
  })
})