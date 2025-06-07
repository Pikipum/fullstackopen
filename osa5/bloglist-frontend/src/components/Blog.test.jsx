import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'


describe('rendering blogs', () => {
    let container

    beforeEach(() => {
        const blog = {
            id: 'aksd903jgfjae2',
            title: 'Test title',
            author: 'John Tester',
            blogUrl: 'testing.com',
            votes: 9
        }
        container = render(<Blog blog={blog} />).container
    })

    test('renders title', () => {
        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(
            'Test title'
        )
    })
    test('renders author', () => {
        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(
            'John Tester'
        )
    })
    test('doesnt render url', () => {
        const div = container.querySelector('.blog')
        expect(div).not.toHaveTextContent(
            'testing.com'
        )
    })
    test('doesnt render votes', () => {
        const div = container.querySelector('.blog')
        expect(div).not.toHaveTextContent(
            9
        )
    })
})
