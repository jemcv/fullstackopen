import { useState } from 'react'

const App = () => { 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGoodFeedback = () => {
    setGood(good + 1)
  }

  const giveNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const giveBadFeedback = () => {
    setBad (bad + 1)
  }

  return (
    <div>
        <h1>give feedback</h1>
        <button onClick={() => giveGoodFeedback()}>good</button>
        <button onClick={() => giveNeutralFeedback()}>neutral</button>
        <button onClick={() => giveBadFeedback()}>bad</button>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
    </div>
  )
}

export default App
