import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, setErrorMessage, user, name }) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const removeBlogConfirm = async (event) => {
        if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}`)) {
            const response = await removeBlog({
                _id: blog.id
            })
        }
        return null
    }

    const voteBlog = async (event) => {
        event.preventDefault()
        try {
            const response = await updateBlog({
                _id: blog.id,
                title: blog.title,
                author: blog.author,
                blogUrl: blog.blogUrl,
                votes: blog.votes + 1,
                voteUpdate: true
            }
            )

            console.log(response)
            setErrorMessage(`You liked "${blog.title}"`)
            setTimeout(() => setErrorMessage(null), 5000)
        } catch (error) {
            console.log(error)
            setErrorMessage('Could not submit like.', error)
            setTimeout(() => setErrorMessage(null), 5000)
        }
    }

    const blogStyle = {
        paddingTop: 3,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 1
    }

    if (visible && name === blog.user.name) {
        return (
            <div style={blogStyle}>
                <div>
                    {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button>
                    <div>
                        {blog.blogUrl}
                    </div>
                    <div>
                        Votes: {blog.votes} <button onClick={voteBlog}>Like</button>
                    </div>
                    <div>
                        {blog.user.name}
                    </div>
                    <div>
                        <button onClick={removeBlogConfirm}>Remove</button>
                    </div>
                </div>
            </div>
        )
    } else if (visible && name !== blog.user.name) {
        return (
            <div style={blogStyle}>
                <div>
                    {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button>
                    <div>
                        {blog.blogUrl}
                    </div>
                    <div>
                        Votes: {blog.votes} <button onClick={voteBlog}>Like</button>
                    </div>
                    <div>
                        {blog.user.name}
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={blogStyle}>
                {blog.title} {blog.author} <button onClick={toggleVisibility}>Show</button>
            </div>
        )
    }


}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Blog