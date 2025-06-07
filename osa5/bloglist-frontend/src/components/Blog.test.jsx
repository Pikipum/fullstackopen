import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders content', () => {
    const blog = {
        id: 'aksd903jgfjae2',
        title: 'Test title',
        author: 'John Tester',
        blogUrl: 'testing.com',
        votes: 9
    }

    //render(<Blog blog={blog} />)

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')

    screen.debug(div)
    
    expect(div).toHaveTextContent(
        blog.title
    )
    expect(div).toHaveTextContent(
        blog.author
    )
    expect(div).not.toHaveTextContent(
        blog.blogUrl
    )
    expect(div).not.toHaveTextContent(
        blog.votes
    )


    //const element = screen.getByText(blog.title, blog.author)


    //expect(element).toBeDefined()
})