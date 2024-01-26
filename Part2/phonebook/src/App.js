import { useState } from "react";
import SearchFilter from "./components/searchFilter";
import PersonForm from "./components/addPerson";
import PersonList from "./components/peopleList";
import personService from "./services/phoneservices";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
  };

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => console.error("Error deleting person:", error));
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personToUpdate = persons.find((person) => person.name === newName);
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Would you like to update the phone number?`
        )
      ) {
        const updatedPerson = { ...personToUpdate, number: newNumber };
        console.log("1", updatedPerson);
        console.log("2", personToUpdate.id, updatedPerson);

        personService
          .update(personToUpdate.id, updatedPerson)
          .then((response) => {
            console.log(response, "this is response ");
            console.log(response.data, "this is response data ");

            setPersons(
              persons.map((person) =>
                person.id === personToUpdate.id ? response.data : person
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => console.error("Error updating person:", error));
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService
        .create(newPerson)
        .then((response) => {
          console.log(response, "this is response ");
          console.log(response.data, "this is response data ");
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => console.error("Error adding person:", error));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <SearchFilter
          searchName={searchName}
          handleSearchName={handleSearchName}
        />
      </div>
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList
        persons={persons}
        searchName={searchName}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
