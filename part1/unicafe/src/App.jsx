import { useState } from 'react'

const ButtonHandler = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const Statistics = (props) => {
  if(props.all === 0){
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
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
        <ButtonHandler onClick={getGoodFeedback} text="good" />
        <ButtonHandler onClick={getNeutralFeedback} text="neutral" />
        <ButtonHandler onClick={getBadFeedback} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
