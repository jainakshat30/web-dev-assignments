const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


let todos = [];
let currentId = 1;


app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});


app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).send('Title and description are required');
    }
  
    const newTodo = {
      id: currentId++,
      title,
      description
    };
    
    todos.push(newTodo);
    res.status(201).json({ id: newTodo.id });
  });

  app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
  
    const { title, description } = req.body;
    if (title) todo.title = title;
    if (description) todo.description = description;
  
    res.status(200).send('Todo updated');
  });


app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
      return res.status(404).send('Todo not found');
    }
  
    todos.splice(todoIndex, 1);
    res.status(200).send('Todo deleted');
  });
  

  app.use((req, res) => {
    res.status(404).send('Route not found');
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
