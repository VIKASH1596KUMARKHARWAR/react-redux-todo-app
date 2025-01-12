// const express = require("express");
// const dotenv = require("dotenv");
// const colors = require("colors");
// const cors = require("cors");
// const { json } = require("body-parser");
// const { nanoid } = require("nanoid");

// dotenv.config({ path: "./config.env" });

// const app = express();

// app.use(cors());
// app.use(json());

// let todos = [
//   {
//     id: nanoid(),
//     title: "todo 1",
//     completed: true,
//     dueDate: "2024-12-05", // Example due date
//   },
//   {
//     id: nanoid(),
//     title: "todo 2",
//     completed: false,
//     dueDate: "2024-12-10",
//   },
//   {
//     id: nanoid(),
//     title: "todo 3",
//     completed: false,
//     dueDate: "2024-12-15",
//   },
//   {
//     id: nanoid(),
//     title: "todo 4",
//     completed: false,
//     dueDate: "2024-11-20",
//   },
//   {
//     id: nanoid(),
//     title: "todo 5",
//     completed: false,
//     dueDate: "2024-12-01",
//   },
// ];

// app.get("/todos", (req, res) => res.send(todos));

// app.post("/todos", (req, res) => {
//   const todo = { 
//     title: req.body.title, 
//     id: nanoid(), 
//     completed: false, 
//     dueDate: req.body.dueDate || "2024-12-31" // Default due date if not provided
//   };
//   todos.push(todo);
//   return res.send(todo);
// });

// app.patch("/todos/:id", (req, res) => {
//   const id = req.params.id;
//   const index = todos.findIndex((todo) => todo.id == id);
//   const completed = Boolean(req.body.completed);
//   if (index > -1) {
//     todos[index].completed = completed;
//   }
//   return res.send(todos[index]);
// });

// app.delete("/todos/:id", (req, res) => {
//   const id = req.params.id;
//   const index = todos.findIndex((todo) => todo.id == id);
//   if (index > -1) {
//     todos.splice(index, 1);
//   }

//   res.send(todos);
// });

// const PORT = 7000;

// app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));

const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");
const fs = require("fs");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(json());

// Define the path to store the todos file
const TODOS_FILE_PATH = './todos.json';
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});



// Helper function to read todos from the file
const readTodosFromFile = () => {
  try {
    const data = fs.readFileSync(TODOS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return []; // Return an empty array if file doesn't exist or can't be read
  }
};

// Helper function to save todos to the file
const writeTodosToFile = (todos) => {
  try {
    const data = JSON.stringify(todos, null, 2); // Pretty print the JSON
    fs.writeFileSync(TODOS_FILE_PATH, data, 'utf8');
  } catch (error) {
    console.error("Error writing todos to file:", error);
  }
};

// Load todos from the file on server startup
let todos = readTodosFromFile();

app.get("/todos", (req, res) => res.send(todos));

app.post("/todos", (req, res) => {
  const todo = { 
    title: req.body.title, 
    id: nanoid(), 
    completed: false, 
    dueDate: req.body.dueDate || "2024-12-31" // Default due date if not provided
  };
  todos.push(todo);
  writeTodosToFile(todos); // Save to file
  return res.send(todo);
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const completed = Boolean(req.body.completed);
  if (index > -1) {
    todos[index].completed = completed;
    writeTodosToFile(todos); // Save to file
  }
  return res.send(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
    writeTodosToFile(todos); // Save to file
  }
  res.send(todos);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
