import React, { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;
const Display =(props)=> <div>{props.value}</div>
const App = () => {
  const [value, setValue] = useState(10);
  const newValue = (val) => {
    console.log("new values is", val);
    setValue(val);
  };

  return (
    <div>
      <Display value={value}/>
      <Button onClick={() => newValue(value + 1)} text={"increase"} />
      <Button onClick={() => newValue(0)} text={"Rest to 0"} />
      <Button onClick={() => newValue(value - 1)} text={"Decrese"} />
    </div>
  );
};

export default App;
