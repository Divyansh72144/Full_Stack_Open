const http = require("http"); //Imports Node's built-in web server
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan"); //Middleware are functions that can be used for handling request and response objects.s
app.use(express.static("build"));
const cors = require("cors");
app.use(express.static("dist"));
app.use(cors());
const mongoose = require("mongoose");
require("dotenv").config();

const Person = require("./models/person");

const password = process.env.DB_PASSWORD;
// DO NOT SAVE YOUR PASSWORD TO GITHUB!!

const url = `mongodb+srv://Divyansh:${password}@divyansh.jvjpnhx.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// const Persons = mongoose.model("Person", personSchema);
// morgan.token("postData", (req) => {
//   return JSON.stringify(req.body);
// });

// app.use(
//   morgan(
//     ":method :url :status :res[content-length] - :response-time ms :postData"
//   )
// );

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

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.get("/api/persons", (request, response) => {
//   response.json(people);
// });

app.get("/info", (request, response) => {
  const currentDate = new Date();
  const itemCount = people.length;

  response.send(
    `<p>Phonebook has info for ${itemCount} people <br/> ${currentDate} </p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log("Received POST request with body:", body);

  if (body.name === undefined || body.number === undefined) {
    console.log("Name or Number missing in the request body.");
    return response.status(400).json({ error: "Name or Number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    console.log("Person saved:", savedPerson);
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  people = people.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
