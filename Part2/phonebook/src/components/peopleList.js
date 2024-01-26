import React from "react";

const PersonList = ({ persons, searchName, handleDeletePerson }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        )
        .map((person) => (
          <li key={person.name}>
            {`${person.name}  ${person.number}`}
            <button onClick={() => handleDeletePerson(person.id)}>
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export default PersonList;
