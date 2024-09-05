import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'

test('renders blog', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        user: {
            username: 'testuser'
        }
    }

    const  { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})