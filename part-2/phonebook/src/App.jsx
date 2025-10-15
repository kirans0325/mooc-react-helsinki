import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:"123-345-678" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson=(event)=>{
    event.preventDefault()
   const newObject={
    name:newName,
    number:newNumber
   }
   // Check if name already exists
    const nameExists = persons.some(person=> person.name === newName)
    nameExists? alert(`${newName} is already added to phonebook`):
   setPersons(persons.concat(newObject))
   
  }
  const handleName=(event)=>{
   setNewName(event.target.value)
  }
  const handleNumber=(event)=>{
    setNewNumber(event.target.value)
  }
  return (                                            
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}onChange={handleName} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     {persons.map((person)=><li key={person.number}>{person.name} {person.number}</li>)}
    </div>
  )
}

export default App