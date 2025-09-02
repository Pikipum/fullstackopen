import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotification } from './NotificationContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const Notification = () => {
	const [notification] = useNotification()
	if (!notification) return null
	return <div className='error'>{notification}</div>
}

const ShowUser = (props) => {
	return (
		<div>
			Logged in as: {props.name}{' '}
			<form onSubmit={props.handleLogout}>
				<button type='submit'>Log out</button>
			</form>
		</div>
	)
}

const BlogView = (props) => {
	return (
		<div>
			{props.blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					updateBlog={props.updateBlog}
					removeBlog={props.removeBlog}
					user={props.user}
					name={props.name}
				/>
			))}
		</div>
	)
}

const LoginScreen = (props) => {
	if (props.user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<form onSubmit={props.handleLoginSubmission}>
					<div>
						username:{' '}
						<input
							name='username'
							value={props.newUserName}
							onChange={props.handleNameFieldChange}
						/>
					</div>
					<div>
						password:{' '}
						<input
							name='password'
							type='password'
							value={props.NewPassword}
							onChange={props.handlePasswordFieldChange}
						/>
					</div>
					<button type='submit'>Login</button>
				</form>
			</div>
		)
	}
	return (
		<div>
			<h2>blogs</h2>
			<ShowUser name={props.name} handleLogout={props.handleLogout} />
			<Togglable buttonLabel='Create blog' ref={props.blogFormRef}>
				<CreateBlogForm
					addBlog={props.addBlog}
					blogFormRef={props.blogFormRef}
				/>
			</Togglable>
			<BlogView
				blogs={props.blogs}
				updateBlog={props.updateBlog}
				removeBlog={props.removeBlog}
				user={props.user}
				name={props.name}
			/>
		</div>
	)
}

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [name, setName] = useState(null)
	const [newUserName, setNewUserName] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [, dispatchNotification] = useNotification()

	const blogFormRef = useRef()
	const queryClient = useQueryClient()

	useEffect(() => {
		blogService
			.getAll()
			.then((blogs) => {
				blogs.sort((a, b) => b.votes - a.votes)
				setBlogs(blogs)
			})
			.catch((error) => {
				dispatchNotification({
					type: 'SHOW',
					payload: 'Could not retrieve blogs',
					error,
				})
				setTimeout(() => {
					dispatchNotification({ type: 'CLEAR' })
				}, 5000)
			})
	}, [])

	useEffect(() => {
		setUser(window.localStorage.getItem('user'))
		setName(window.localStorage.getItem('name'))
	}, [])

	const handleLoginSubmission = async (event) => {
		event.preventDefault()
		try {
			const response = await loginService.login({
				username: newUserName,
				password: newPassword,
			})
			console.log(response)
			setUser(response.data.token)
			setName(response.data.name)
			window.localStorage.setItem('user', response.data.token)
			window.localStorage.setItem('name', response.data.name)

			dispatchNotification({ type: 'SHOW', payload: `Login succesful, logged in as ${response.data.name}.`})
			setTimeout(() => {
				dispatchNotification({ type: 'CLEAR' })
			}, 5000)
		} catch (error) {
			console.log('login failed', error)
			dispatchNotification({ type: 'SHOW', payload: 'Wrong username or password.'})
			setTimeout(() => {
				dispatchNotification({ type: 'CLEAR' })
			}, 5000)
		}
	}

	const addBlog = async (blogObject) => {
		const response = await blogService.post(blogObject, user)
		setBlogs(blogs.concat(response))
		return response
	}

	const updateBlog = async (blogObject) => {
		const response = await blogService.put(blogObject._id, blogObject, user)
		const updatedBlogs = await blogService.getAll()
		updatedBlogs.sort((a, b) => b.votes - a.votes)
		setBlogs(updatedBlogs)
		return response
	}

	const removeBlog = async (blogObject) => {
		const response = await blogService.deleteBlog(blogObject._id, user)
		const updatedBlogs = await blogService.getAll()
		updatedBlogs.sort((a, b) => b.votes - a.votes)
		setBlogs(updatedBlogs)
		return response
	}

	const handleNameFieldChange = (event) => {
		setNewUserName(event.target.value)
		console.log(event.target.value)
	}
	const handlePasswordFieldChange = (event) => {
		setNewPassword(event.target.value)
		console.log(event.target.value)
	}
	const handleLogout = (event) => {
		window.localStorage.removeItem('user')
		window.localStorage.removeItem('name')
		setUser(null)
		setName(null)

		dispatchNotification({ type: 'SHOW', payload: 'Log out succesful.'})
		setTimeout(() => {
			dispatchNotification({ type: 'CLEAR' })
		}, 5000)
	}

	return (
		<div>
			<Notification />
			<LoginScreen
				user={user}
				blogs={blogs}
				newUserName={newUserName}
				newPassword={newPassword}
				handleLoginSubmission={handleLoginSubmission}
				handleNameFieldChange={handleNameFieldChange}
				handlePasswordFieldChange={handlePasswordFieldChange}
				name={name}
				handleLogout={handleLogout}
				blogFormRef={blogFormRef}
				addBlog={addBlog}
				updateBlog={updateBlog}
				removeBlog={removeBlog}
			/>
		</div>
	)
}

export default App
