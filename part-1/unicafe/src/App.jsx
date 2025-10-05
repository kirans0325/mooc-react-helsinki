import { useState } from "react";

const Header = (props) => {
  return <h1>{props.heading}</h1>;
};
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Stastics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = (good / (total || 1)) * 100;
  return (
    <div>
      <p>good : {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad : {bad}</p>
      <p>all :{good + neutral + bad}</p>
      <p>average:{average} </p>
      <p>positive:{positive}% </p>
    </div>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleBad = () => {
    const badClick = bad + 1;
    setBad(badClick);
  };
  const handleNeutral = () => {
    const neutralClick = neutral + 1;
    setNeutral(neutralClick);
  };
  const handleGood = () => {
    const goodClick = good + 1;
    setGood(goodClick);
  };

  return (
    <div>
      <Header heading={"give feedback"} />
      <Button onClick={handleGood} text={"good"} />
      <Button onClick={handleNeutral} text={"neutral"} />
      <Button onClick={handleBad} text={"bad"} />
      <Header heading={"Stastics"} />
      <Stastics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
