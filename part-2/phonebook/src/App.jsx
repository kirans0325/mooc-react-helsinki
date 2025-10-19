import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/notes";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({ message: null, type: "" });

 
  useEffect(() => {
    personService
      .getAll()
      .then((response) => setPersons(response))
      .catch(() => {
        showNotification("Failed to fetch contacts from server", "error");
      });
  }, []);

 
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: "" });
    }, 4000);
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
    const nameObject = { name: newName, number: newNumber };

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        personService
          .update(existingPerson.id, nameObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : updatedPerson
              )
            );
            showNotification(
              `Updated ${updatedPerson.name}'s number`,
              "success"
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            // ❌ Handle backend 404 or network error
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              "error"
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    } else {
      personService
        .create(nameObject)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNewName("");
          setNewNumber("");
          showNotification(`Added ${createdPerson.name}`, "success");
        })
        .catch(() => {
          showNotification("Failed to add person", "error");
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
          showNotification(`Deleted ${name}`, "success");
        })
        .catch(() => {
          // ❌ If the person was already deleted
          showNotification(
            `Information of ${name} has already been removed from server`,
            "error"
          );
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} type={notification.type} />

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
            {person.name} {person.number}{" "}
            <button onClick={() => handleRemove(person.id, person.name)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
