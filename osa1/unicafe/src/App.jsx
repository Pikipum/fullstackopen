import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = (props) => {
  return (
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>
  )
}

const Statistics = (props) => {
  const good = props.stats[0]
  const neutral = props.stats[1]
  const bad = props.stats[2]
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all

  if (all != 0) {
    return (
      <table>
        <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={all} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive} />
        </tbody>
      </table>
    )
  } else {
    return (
      <>
        <p>No feedback given</p>
      </>
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
    <>
      <h1>Give feedback</h1>
      <Button onClick={handleClickGood} text='Good' />
      <Button onClick={handleClickNeutral} text='Neutral' />
      <Button onClick={handleClickBad} text='Bad' />
      <h1>Statistics</h1>  
      <Statistics stats={[good, neutral, bad]} />
    </>
  )
}

export default App