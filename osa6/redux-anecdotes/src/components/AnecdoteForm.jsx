import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const addNewAnecdote = (event) => {
        event.preventDefault()
        console.log(event)
        dispatch(addAnecdote(event.target.newAnecdote.value))
        dispatch(showNotification(`You added new anecdote: ${event.target.newAnecdote.value}`))
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
                <input name="newAnecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm