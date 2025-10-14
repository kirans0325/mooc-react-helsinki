import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson=(event)=>{
    event.preventDefault()
   const newObject={
    name:newName
   }
   setPersons(persons.concat(newObject))
  }
  const handleChange=(event)=>{
   setNewName(event.target.value)
  }

  return (                                            
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     {persons.map((person,val)=><li key={val}>{person.name}</li>)}
    </div>
  )
}

export default App