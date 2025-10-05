import { useState } from 'react'

const Header =(props)=>{
  return <h1>{props.heading}</h1>
}
const Button=({onClick,text})=>{
  return <button onClick={onClick}>{text}</button>
}

const Total =({good, neutral, bad})=>{
  return <div>
    <p>good : {good}</p>
    <p>neutral: {neutral}</p>
    <p>bad : {bad}</p>
  </div>
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 
  return (
    <div>
      <Header heading={"give feedback"}/>
      <Button onClick={()=>setGood(good+1)} text={"good"}/>
      <Button onClick={()=>setNeutral(good+1)}text={"neutral"}/>
      <Button onClick={()=>setBad(good+1)}text={"bad"}/>
      <Header heading={"Stastics"} />
      {console.log(good)}
      <Total good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App