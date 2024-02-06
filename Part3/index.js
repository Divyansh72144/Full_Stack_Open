const express = require('express');

const app = express();
const path = require('path');

app.use(express.static('build'));
const cors = require('cors');

app.use(express.static('dist'));
app.use(cors());
const mongoose = require('mongoose');
require('dotenv').config();

const Person = require('./models/person');

const password = process.env.DB_PASSWORD;
// DO NOT SAVE YOUR PASSWORD TO GITHUB!!

const url = `mongodb+srv://Divyansh:${password}@divyansh.jvjpnhx.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator(v) {
        return /^\d{2,3}-\d+$/.test(v); // Update the regex pattern
      },
      message: (props) => `${props.value} is not a valid phone number! Please use the format xx-xxxxxxx or xxx-xxxxxxx.`,
    },
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    returnedObject.id = returnedObject._id.toString();
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject._id;
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v;
  },
});

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  // eslint-disable-next-line no-console
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    if (
      error.errors
      && error.errors.name
      && error.errors.name.kind === 'minlength'
    ) {
      return response
        .status(400)
        .json({ error: 'Name must be at least 3 characters long' });
    }
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.use(express.json());

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/info', (request, response, next) => {
  const currentDate = new Date();
  Person.find({})
    .then((items) => {
      response.send(
        `<p>Phonebook has info for ${items.length} persons</p>
       <br>
       <p>${currentDate}</p>`,
      );
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      response.status(400).send({ error: 'malformatted id' });
    })
    .catch((error) => next(error));
});

// eslint-disable-next-line consistent-return
app.post('/api/persons', (request, response, next) => {
  const { body } = request;
  if (!body.name || body.name.length < 3 || !body.number) {
    // eslint-disable-next-line no-console
    console.log('Validation error:', body.name);
    return response.status(400).json({
      error:
        'Name must be at least 3 characters long and number must be provided',
    });
  }

  if (!/^\d{2,3}-\d+$/.test(body.number)) {
    return response.status(400).json({
      error:
        'Invalid phone number format! Please use the format xx-xxxxxxx or xxx-xxxxxxx.',
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// eslint-disable-next-line consistent-return
app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const person = {
    name: body.name,
    number: body.number,
  };

  if (!/^\d{2,3}-\d+$/.test(person.number)) {
    return response.status(400).json({
      error:
        'Invalid phone number format! Please use the format xx-xxxxxxx or xxx-xxxxxxx.',
    });
  }

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).json({ error: 'Person not found' });
      }
    })
    .catch((error) => next(error));
});

const { PORT } = process.env;
app.listen(PORT);
// eslint-disable-next-line no-console
console.log(`Server running on port ${PORT}`);
