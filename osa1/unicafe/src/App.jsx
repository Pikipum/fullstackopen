import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = bad + neutral + good
  const average = (good - bad) / all
  const positive = good / all

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
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p> 
      <p>All {all}</p>
      <p>Average {average}</p>
      <p>Positive {positive}</p>
    </div>
  )
}

export default App