const http = require("http"); //Imports Node's built-in web server
const express = require("express");
const app = express();
app.use(express.json());

const generateRandomId = () => {
  const min = 1;
  const max = 1000000;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send(`<h1>Hello World!</h1>`);
});

app.get("/api/persons", (request, response) => {
  response.json(people);
});

app.get("/info", (request, response) => {
  const currentDate = new Date();
  const itemCount = people.length;

  response.send(
    `<p>Phonebook has info for ${itemCount} people <br/> ${currentDate} </p>`
  );
});

app.get("/api/person/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = people.find((person) => {
    return person.id === id;
  });

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  const nameExists = people.some(
    (existingPerson) =>
      existingPerson.name.toLowerCase() === person.name.toLowerCase()
  );
  if (
    !person.name ||
    person.name.trim() === "" ||
    !person.number ||
    person.number.trim() === ""
  ) {
    return response.status(400).json({ error: "Name or Number is missing" });
  }

  if (nameExists) {
    return response.status(400).json({ error: "Name must be unique" });
  }

  const newId = generateRandomId();
  person.id = newId;
  console.log(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  people = people.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
