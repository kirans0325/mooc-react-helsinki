import { useState } from "react";

const Header = (props) => {
  return <h1>{props.heading}</h1>;
};
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <p>
        {text}:{value}
      </p>
    </div>
  );
};
const Stastics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = (good / (total || 1)) * 100;
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feed back given</p>;
  } else {
    return (
      <div>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={total} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={positive} />
      </div>
    );
  }
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
