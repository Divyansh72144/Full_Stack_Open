import { useState } from "react";
import SearchFilter from "./components/searchFilter";
import PersonForm from "./components/addPerson";
import PersonList from "./components/peopleList";
import personService from "./services/phoneservices";
import { useEffect } from "react";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    // Check for a specific keyword or phrase to identify success or error
    const isSuccessMessage = message.toLowerCase().includes("success");
    const className = isSuccessMessage ? "success" : "error";

    return <div className={className}>{message}</div>;
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        setErrorMessage(`Error fetching data: ${error.response.data.error}`);
      });
  }, []);

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setErrorMessage(`Success, Deleted ${personToDelete.name}`);
        })
        .catch((error) => {
          setErrorMessage(
            `error, Information of ${personToDelete.name} has already been removed from the server`
          );
        });
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
          setErrorMessage(`success, Added ${newPerson.name}`);
        })
        .catch((error) => {
          setErrorMessage(
            `There was a problem adding ${newPerson.name} was added`
          );
        });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
