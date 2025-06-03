import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 3,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 1
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button>
          <div>
            {blog.blogUrl}
          </div>
          <div>
            Votes: {blog.votes} <button>Like</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>Show</button>
      </div>
    )
  }


}

export default Blog