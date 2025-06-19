import { useSelector, useDispatch } from 'react-redux'
import { vote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.sort((b, a) => a.votes - b.votes))
  const dispatch = useDispatch()

  const voteAnecdote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
  }
  const addNewAnecdote = (event) => {
    console.log(event)
    dispatch(addAnecdote(event))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <input name="newAnecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App