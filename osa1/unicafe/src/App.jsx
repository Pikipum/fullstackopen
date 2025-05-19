import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
  const good = props.stats[0]
  const neutral = props.stats[1]
  const bad = props.stats[2]
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all

  if (all != 0) {
    return (
      <div>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p> 
        <p>All {all}</p>
        <p>Average {average}</p>
        <p>Positive {positive}</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleClickBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleClickGood} text='Good' />
      <Button onClick={handleClickNeutral} text='Neutral' />
      <Button onClick={handleClickBad} text='Bad' />
      <h1>Statistics</h1>
      <Statistics stats={[good, neutral, bad]} />
    </div>
  )
}

export default App