import React from "react";

const Header = ({ courseName }) => {
    
  return <div>
     <h2>{courseName}</h2>
     </div>
 
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

return  <h3>total of {result}  exercises</h3>
}


const Course = ({ course }) => {
  return (
    <div>
        
      <Header courseName={course.name}/>
      <Content parts={course.parts} />
      <Total total={course.parts}/>
    </div>
  );
};

export default Course;
