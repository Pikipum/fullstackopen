import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        console.log(filter)
        if (filter === '') {
            return anecdotes.sort((b, a) => a.votes - b.votes)
        }
        return anecdotes.filter(anecdote => anecdote.content.includes(filter)).sort((b, a) => a.votes - b.votes)
    })

    const voteAnecdote = (id) => {
        console.log('vote', id)
        dispatch(vote(id))
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
                        <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList