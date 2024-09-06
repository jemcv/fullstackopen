import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import { vi } from 'vitest'

test('renders blog', () => {
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

test('shows blog details when view button is clicked', async () => {
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

test('like button is clicked twice event handler received twice', async () => {
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