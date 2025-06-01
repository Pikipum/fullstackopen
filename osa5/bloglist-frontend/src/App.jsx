import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const BlogView = (props) => {
  return (
    <div>
      <h2>blogs</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const LoginScreen = (props) => {
  if (props.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={props.handleLoginSubmission}>
          <div>username: <input name="username" value={props.newUserName} onChange={props.handleNameFieldChange} /></div>
          <div>password: <input name="password" type="password" value={props.NewPassword} onChange={props.handlePasswordFieldChange} /></div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
  return (
    <BlogView blogs={props.blogs} />
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newUserName, setNewUserName] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLoginSubmission = async (event) => {
    event.preventDefault()
    try {
      const response = await loginService.login({
        username: newUserName,
        password: newPassword
      })
      console.log(response)
      setUser(response.data.token)
    } catch (error) {
      console.log('login failed', error)
    }
    
  }
  const handleNameFieldChange = (event) => {
    setNewUserName(event.target.value)
    console.log(event.target.value)
  }
  const handlePasswordFieldChange = (event) => {
    setNewPassword(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>blogs</h2>
      <LoginScreen user={user} blogs={blogs}
        newUserName={newUserName} newPassword={newPassword}
        handleLoginSubmission={handleLoginSubmission}
        handleNameFieldChange={handleNameFieldChange}
        handlePasswordFieldChange={handlePasswordFieldChange} />
    </div>
  )
}

export default App