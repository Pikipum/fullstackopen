import { useDispatch } from 'react-redux'
import { addAnecdote, createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
import { isAction } from '@reduxjs/toolkit'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You added new anecdote: ${content}`, 5))
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