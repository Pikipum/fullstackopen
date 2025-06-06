import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function indexOfMax(arr) {
    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[maxIndex]) {
            maxIndex = i;
        }
    }
    return maxIndex;
}

const NumberOfVotes = (props) => {
  return(
    <p>Has {props.votes[props.selected]} votes</p>
  )
}

const MostVoted = (props) => {
  const index = indexOfMax(props.votes)
  return (
    <p>{props.anecdotes[index]}</p>
  )
}

const App = () => {
  
  const [selected, setSelected] = useState(0)

  const handleClickNext = () => {
    setSelected(getRandomIntInclusive(0,anecdotes.length))
  }

  const handleClickVote = () => {
    votes[selected] += 1
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <NumberOfVotes votes={votes} selected={selected}/>
      <Button onClick={handleClickNext} text='Next anecdote' />
      <Button onClick={handleClickVote} text='Vote' />
      <h1>Anecdote with the most votes</h1>
      <MostVoted votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

const votes = Array(anecdotes.length).fill(0)

export default App