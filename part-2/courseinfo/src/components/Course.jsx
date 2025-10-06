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
  {
    console.log(parts.id);
  }
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercise={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
