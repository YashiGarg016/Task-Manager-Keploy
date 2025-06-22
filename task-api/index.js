const express = require('express');
const mongoose = require('mongoose');
const Task = require('./Task');

const app = express();
app.use(express.json());

async function connectDB(uri) {
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');
}

app.get('/', (req, res) => {
  res.send('Welcome to your API server!');
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID');
  }

  const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedTask) return res.status(404).send('Task not found');
  res.json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID');
  }

  const deleted = await Task.findByIdAndDelete(id);
  if (!deleted) return res.status(404).send('Task not found');
  res.send('Task deleted');
});

app.use((req, res) => {
  res.status(404).send(`No route found for ${req.method} ${req.url}`);
});

module.exports = { app, connectDB };