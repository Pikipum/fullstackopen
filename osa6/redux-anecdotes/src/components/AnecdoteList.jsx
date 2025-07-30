import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, voteAnecdoteAsync } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        const anecdotesCopy = [...anecdotes]
        if (filter === '') {
            return anecdotesCopy.sort((b, a) => a.votes - b.votes)
        }
        return anecdotesCopy.filter(anecdote => anecdote.content.includes(filter)).sort((b, a) => a.votes - b.votes)
    })

    const dispatchVote = (anecdote) => {
        dispatch(showNotification(`You voted for anecdote: ${anecdote.content}`))
        dispatch(voteAnecdoteAsync(anecdote))
    }
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatchVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList