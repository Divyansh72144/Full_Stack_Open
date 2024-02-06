/* eslint-disable no-console */
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);
const name = process.argv[3];
const number = process.argv[4];

const dbName = 'phonebook';

const url = `mongodb+srv://Divyansh:${password}@divyansh.jvjpnhx.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const PhoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', PhoneSchema);

if (name && number) {
  const person = new Person({
    name,
    number,
  });
  person.save().then(() => {
    console.log(`added ${person.name} ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}
