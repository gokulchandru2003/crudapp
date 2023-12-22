const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3080;

app.use(express.static(__dirname + "/public"));

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/studentPortalDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  dob: Date,
  number: String,
  gmail: String,
});

const Student = mongoose.model('Student', studentSchema);

app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  console.log("Received POST request:", req.body);

  const studentData = req.body;
  const newStudent = new Student(studentData);

  newStudent.save((err) => {
    if (err) {
      console.error('Error saving student:', err);
      res.status(500).send('Error saving student');
    } else {
      console.log('Student saved successfully');
      res.status(200).send('Student saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
