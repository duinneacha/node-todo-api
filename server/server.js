const express = require('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;


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

// Get Route using params - i.e. /todos/2132413
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  // Check to see if the ID entered is a valid mongodb _id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    // Happy path here - send the found todo back wrapped as an object
    res.send({ todo });

  }).catch((error) => {
    res.status(400).send();
  })

  // res.send(req.params);
});


app.listen(port, () => {
  console.log(`Started on Port ${port}`);
});


module.exports = { app };