import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
import { isAction } from '@reduxjs/toolkit'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const response = await anecdoteService.addNew(event.target.newAnecdote.value)
        dispatch(addAnecdote(response))
        dispatch(showNotification(`You added new anecdote: ${response.content}`))
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