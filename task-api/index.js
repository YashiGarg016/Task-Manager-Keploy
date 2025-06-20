const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/tasksDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Base route
app.get("/", (req, res) => {
  res.send("Welcome to your API server!");
});

// Import model
console.log("📦 Loading Task model...");
let Task;
try {
  Task = require("./Task");
  console.log("✅ Task model loaded");
} catch (err) {
  console.error("🔥 Failed to load Task.js:", err);
}

// Register API routes
if (Task) {
  console.log("🚀 Registering /tasks routes...");
  try {
    // Get all tasks
    app.get("/tasks", async (req, res) => {
      const tasks = await Task.find();
      res.json(tasks);
    });

    // Add a task
    app.post("/tasks", async (req, res) => {
      const newTask = new Task(req.body);
      await newTask.save();
      res.json(newTask);
    });

    // Update a task
    app.put("/tasks/:id", async (req, res) => {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTask);
    });

    // Delete a task
    app.delete("/tasks/:id", async (req, res) => {
      await Task.findByIdAndDelete(req.params.id);
      res.send("Task deleted");
    });

    // Debug route to confirm POST works
    app.post("/ping", (req, res) => {
      res.send("Pong received!");
    });

    console.log("✅ All API routes registered");
  } catch (err) {
    console.error("🔥 Failed to register API routes:", err);
  }
}

// Catch-all route for unknown paths
app.use((req, res) => {
  res.status(404).send(`No route found for ${req.method} ${req.url}`);
});

// Catch-all route for unknown paths
app.use((req, res) => {
  console.log(`❌ Unknown route hit: ${req.method} ${req.url}`);
  res.status(404).send(`No route found for ${req.method} ${req.url}`);
});
// Start server
app.listen(3000, "0.0.0.0", () => {
  console.log("🌍 Server running on http://localhost:3000");
});