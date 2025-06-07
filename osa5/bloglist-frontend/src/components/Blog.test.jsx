import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe, expect, test, vi } from 'vitest'

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
    test('doesnt render url by default', () => {
        const div = container.querySelector('.blog')
        expect(div).not.toHaveTextContent(
            'testing.com'
        )
    })
    test('doesnt render votes by default', () => {
        const div = container.querySelector('.blog')
        expect(div).not.toHaveTextContent(
            9
        )
    })
})
describe('button pressed', async () => {
    let container
    beforeEach(() => {
        const blog = {
            id: 'aksd903jgfjae2',
            title: 'Test title',
            author: 'John Tester',
            blogUrl: 'testing.com',
            votes: 965,
            user: {
                name: 'John Blogger'
            }
        }
        const mockHandler = vi.fn()
        container = render(<Blog blog={blog} toggleVisibility={mockHandler} />).container
    })
    test('url renders when show button pressed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('Show')
        await user.click(button)
        const div = container.querySelector('.blog')

        expect(div).toHaveTextContent(
            'testing.com'
        )
    })
    test('votes renders when show button pressed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('Show')
        await user.click(button)
        const div = container.querySelector('.blog')

        expect(div).toHaveTextContent(
            965
        )
    })
    test('user renders when show button pressed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('Show')
        await user.click(button)
        const div = container.querySelector('.blog')

        expect(div).toHaveTextContent(
            'John Blogger'
        )
    })
})