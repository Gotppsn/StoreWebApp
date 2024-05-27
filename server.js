//mongodb+srv://panupol:0394641234@panupol.ighygyc.mongodb.net/?retryWrites=true&w=majority&appName=panupol
// server.js

// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
/////////////////////
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const dbUri = 'mongodb+srv://panupol:0394641234@panupol.ighygyc.mongodb.net/?retryWrites=true&w=majority&appName=panupol';

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define a schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String,
});

const Student = mongoose.model('Student', studentSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/insert', async (req, res) => {
  const { name, age, grade } = req.body;
  const newStudent = new Student({ name, age, grade });
  try {
    await newStudent.save();
    res.send('Student inserted successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/update', async (req, res) => {
  const { id, name, age, grade } = req.body;
  try {
    await Student.findByIdAndUpdate(id, { name, age, grade });
    res.send('Student updated successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/delete', async (req, res) => {
  const { id } = req.body;
  try {
    await Student.findByIdAndDelete(id);
    res.send('Student deleted successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
