import { useState } from 'react'

const Statistics = (props) => {
  return(
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive} %</p>
    </div>
  )
}

const App = () => { 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const getGoodFeedback = () => {
    setGood(good + 1);
    const updatedGood = good + bad + neutral + 1;
    setAll(updatedGood);
    const positive = (good / updatedGood) * 100;
    setPositive(positive);
    const totalScore =  good * 1 + neutral * 0 + bad * -1;
    const totalAve = totalScore / updatedGood 
    setAverage(totalAve);
  }

  const getNeutralFeedback = () => {
    setNeutral(neutral + 1);
    const updatedNeutral = good + bad + neutral + 1;
    setAll(updatedNeutral);
    const positive = (good / updatedNeutral) * 100;
    setPositive(positive);
    const totalScore = good * 1 + neutral * 0 + bad * -1;
    const totalAve = totalScore / updatedNeutral
    setAverage(totalAve);
  }

  const getBadFeedback = () => {
    setBad(bad + 1);
    const updatedBad = good + bad + neutral + 1;
    setAll(updatedBad);
    const positive = (good / updatedBad) * 100;
    setPositive(positive);
    const totalScore = good * 1 + neutral * 0 + bad * -1;
    const totalAve = totalScore / updatedBad
    setAverage(totalAve);
  }

  return (
    <div>
        <h1>give feedback</h1>
          <button onClick={() => getGoodFeedback()}>good</button>
          <button onClick={() => getNeutralFeedback()}>neutral</button>
          <button onClick={() => getBadFeedback()}>bad</button>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
