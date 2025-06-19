import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const addNewAnecdote = (event) => {
        console.log(event)
        dispatch(addAnecdote(event))
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