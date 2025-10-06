import React from "react";

const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};
const Part = ({ name, exercise }) => {
  return (
    <li>
      {name}
      {exercise}
    </li>
  );
};
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercise={part.exercises} />
      ))}
    </div>
  );
};
const Total=({total})=>{
const result = total.reduce((sum,total)=>{return sum+total.exercises },0)

return  <h2>total {result} of exercises</h2>
}


const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts}/>
    </div>
  );
};

export default Course;
