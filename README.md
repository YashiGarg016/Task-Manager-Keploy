# Task Manager API

A simple RESTful API for managing tasks, built with Node.js, Express, and MongoDB (using Mongoose). This API supports full CRUD operations and is easy to run locally.

---

## 📋 API Endpoints & Functionality

### 1. Get All Tasks
- **Endpoint:** `GET /tasks`
- **Functionality:** Retrieves all tasks from the database.
- **Sample Request:**
  ```
  GET http://127.0.0.1:3000/tasks
  ```
- **Sample Response:**
  ```json
  [
    {
      "_id": "665590c1e7b1a2f1c8a1b234",
      "title": "Buy groceries",
      "description": "Milk, Bread, Eggs",
      "__v": 0
    }
  ]
  ```

### 2. Create a New Task
- **Endpoint:** `POST /tasks`
- **Functionality:** Adds a new task to the database.
- **Sample Request:**
  ```
  POST http://127.0.0.1:3000/tasks
  Content-Type: application/json

  {
    "title": "Read a book",
    "description": "Finish reading 'Atomic Habits'"
  }
  ```
- **Sample Response:**
  ```json
  {
    "_id": "66559123e7b1a2f1c8a1b235",
    "title": "Read a book",
    "description": "Finish reading 'Atomic Habits'",
    "__v": 0
  }
  ```

### 3. Update a Task
- **Endpoint:** `PUT /tasks/:id`
- **Functionality:** Updates an existing task by its ID.
- **Sample Request:**
  ```
  PUT http://127.0.0.1:3000/tasks/66559123e7b1a2f1c8a1b235
  Content-Type: application/json

  {
    "title": "Read two books",
    "description": "Finish reading 'Atomic Habits' and 'Deep Work'"
  }
  ```
- **Sample Response:**
  ```json
  {
    "_id": "66559123e7b1a2f1c8a1b235",
    "title": "Read two books",
    "description": "Finish reading 'Atomic Habits' and 'Deep Work'",
    "__v": 0
  }
  ```

### 4. Delete a Task
- **Endpoint:** `DELETE /tasks/:id`
- **Functionality:** Deletes a task by its ID.
- **Sample Request:**
  ```
  DELETE http://127.0.0.1:3000/tasks/66559123e7b1a2f1c8a1b235
  ```
- **Sample Response:**
  ```
  Task deleted
  ```

---

## 🗄️ Database Used & Integration

- **Database:** MongoDB
- **Integration:** The API uses [Mongoose](https://mongoosejs.com/) to connect to a local MongoDB instance at `mongodb://localhost:27017/tasksDB`.
- **Schema:** Each task has a `title` (String) and `description` (String).

**Integration Example:**
```js
mongoose.connect("mongodb://localhost:27017/tasksDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
```

---

## 🚀 How to Run the Server

1. **Install Dependencies**
   ```sh
   npm install
   ```

2. **Start MongoDB**
   - Make sure MongoDB is running locally on your machine (`mongodb://localhost:27017`).

3. **Run the Server**
   ```sh
   node index.js
   ```
   The server will start on [http://127.0.0.1:3000](http://127.0.0.1:3000).

---

## 🛠️ How to Interact with the API

- Use [Postman](https://www.postman.com/) or `curl` to send requests to the API.
- **Base URL:** `http://127.0.0.1:3000`

### Example `curl` Commands

- **Get all tasks:**
  ```sh
  curl http://127.0.0.1:3000/tasks
  ```

- **Create a new task:**
  ```sh
  curl -X POST http://127.0.0.1:3000/tasks \
    -H "Content-Type: application/json" \
    -d '{"title":"Read a book","description":"Finish reading Atomic Habits"}'
  ```

- **Update a task:**
  ```sh
  curl -X PUT http://127.0.0.1:3000/tasks/<TASK_ID> \
    -H "Content-Type: application/json" \
    -d '{"title":"Read two books","description":"Finish reading Atomic Habits and Deep Work"}'
  ```

- **Delete a task:**
  ```sh
  curl -X DELETE http://127.0.0.1:3000/tasks/<TASK_ID>
  ```

---

## 📓 Notes

- Replace `<TASK_ID>` with the actual `_id` value of the task you want to update or delete.
- The API works with `127.0.0.1` as the host. If you use `localhost` and face issues, stick to `127.0.0.1`.
- All responses are in JSON except for the delete operation, which returns a plain text confirmation.

---