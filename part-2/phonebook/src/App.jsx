import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/notes"; 

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

 
  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const addPerson = (event) => {
  event.preventDefault();

  const existingPerson = persons.find(
    (person) => person.name.toLowerCase() === newName.toLowerCase()
  );

  const nameObject = {
    name: newName,
    number: newNumber,
  };

  if (existingPerson) {
    const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    );

    if (confirmUpdate) {
      
      personService
        .update(existingPerson.id, nameObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) =>
              p.id !== existingPerson.id ? p : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          alert(
            `Information of ${existingPerson.name} has already been removed from server`
          );
          setPersons(persons.filter((p) => p.id !== existingPerson.id));
        });
    }
  } else {
    
    personService.create(nameObject).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      setNewName("");
      setNewNumber("");
    });
  }
}; 
  const handleRemove = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
        
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          alert(`The person '${name}' was already deleted from server`);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };


  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange={handleSearchChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button  onClick={() => handleRemove(person.id, person.name)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
