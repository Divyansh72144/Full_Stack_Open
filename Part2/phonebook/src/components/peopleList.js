import React from "react";

const PersonList = ({ persons, searchName }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        )
        .map((person) => (
          <li key={person.name}>{`${person.name}  ${person.number}`}</li>
        ))}
    </ul>
  );
};

export default PersonList;
