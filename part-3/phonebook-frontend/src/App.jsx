import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from "./components/Persons";
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  // Fetch initial data
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(() => {
        setError(true)
        setMessage('Error fetching phonebook data')
        setTimeout(() => setMessage(null), 3000)
      })
  }, [])

  // Add person
  const addPerson = (event) => {
    event.preventDefault()

    const existing = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (existing) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObj = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObj)
      .then(returned => {
        setPersons(persons.concat(returned))
        setMessage(`Added ${newName}`)
        setError(false)
        setTimeout(() => setMessage(null), 3000)
        setNewName('')
        setNewNumber('')
      })
      .catch(() => {
        setError(true)
        setMessage('Error adding contact')
        setTimeout(() => setMessage(null), 3000)
      })
  }

  // Delete person
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`Deleted ${person.name}`)
          setError(false)
          setTimeout(() => setMessage(null), 3000)
        })
        .catch(() => {
          setError(true)
          setMessage('Error deleting contact')
          setTimeout(() => setMessage(null), 3000)
        })
    }
  }

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleFilterChange = e => setFilter(e.target.value)

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />

      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
