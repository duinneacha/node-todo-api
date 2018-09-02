const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

// Middleware confiruration - bodyParser will control the format of the json
app.use(bodyParser.json());


// Post Route
app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (error) => {
    res.status(400).send(error);
  });
});

// Get Route
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos });
  }, (error) => {
    res.status(400).send(error);
  });
});



app.listen(3000, () => {
  console.log('Started on Port 3000');
});


module.exports = { app };