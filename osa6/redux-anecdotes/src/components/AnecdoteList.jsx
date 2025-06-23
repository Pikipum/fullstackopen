import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        const anecdotesCopy = [...anecdotes]
        if (filter === '') {
            return anecdotesCopy.sort((b, a) => a.votes - b.votes)
        }
        return anecdotesCopy.filter(anecdote => anecdote.content.includes(filter)).sort((b, a) => a.votes - b.votes)
    })

    const dispatchVote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
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
                        <button onClick={() => dispatchVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList