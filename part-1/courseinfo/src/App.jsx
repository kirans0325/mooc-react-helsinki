const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const Header =({course})=>{
    return <div>
      <h1>{course}</h1>
    </div>
  }

  const Total =({exercises1,exercises2,exercises3})=>{
    return <div>
      <p>Number of exercises : {exercises1+exercises2+exercises3} </p>
    </div>
  }
  const Part=({part,exercises})=>{
    return <div>
        <p>{part}{exercises}</p>
    </div>
  }

  return (
    <div>
      <Header course={course}/>


      <Part part={part1.name} exercises={part1.exercises} />
      <Part part={part2.name} exercises={part2.exercises} />
      <Part part={part3.name} exercises={part3.exercises} />
    

     <Total  part exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
       
    </div>
  )
}

export default App