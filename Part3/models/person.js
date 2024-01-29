const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

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

module.exports = mongoose.model("Person", personSchema);

// app.get("/api/persons", (request, response) => {
//   Person.find({}).then((persons) => {
//     response.json(persons);
//   });
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.get("/api/persons", (request, response) => {
//   response.json(people);
// });

// app.get("/info", (request, response) => {
//   const currentDate = new Date();
//   const itemCount = people.length;

//   response.send(
//     `<p>Phonebook has info for ${itemCount} people <br/> ${currentDate} </p>`
//   );
// });

// app.get("/api/person/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const person = people.find((person) => {
//     return person.id === id;
//   });

//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

// app.post("/api/persons", (request, response) => {
//   const person = request.body;
//   const nameExists = people.some(
//     (existingPerson) =>
//       existingPerson.name.toLowerCase() === person.name.toLowerCase()
//   );
//   if (
//     !person.name ||
//     person.name.trim() === "" ||
//     !person.number ||
//     person.number.trim() === ""
//   ) {
//     return response.status(400).json({ error: "Name or Number is missing" });
//   }

//   if (nameExists) {
//     return response.status(400).json({ error: "Name must be unique" });
//   }

//   const newId = generateRandomId();
//   person.id = newId;
//   console.log(person);
//   response.json(person);
// });

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   people = people.filter((person) => person.id !== id);

//   response.status(204).end();
// });

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);
