require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT;


// Middleware confiruration - bodyParser will control the format of the json
app.use(bodyParser.json());


// Post Route Todos
app.post('/todos', (req, res) => {

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (error) => {
    res.status(400).send(error);
  });
});

// Get Route Todos
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

// Delete Route
app.delete('/todos/:id', (req, res) => {

  // Get the ID from the request
  var id = req.params.id;

  // Check to see if the ID entered is a valid mongodb _id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    // Happy scenario here
    res.send({ todo });

  }).catch((error) => {
    res.status(400).send();
  })
});

// Update Todo items
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;

  // get the text and completed fields from the info passed to the request using lodash
  var body = _.pick(req.body, ['text', 'completed']);

  // // Validate that the id entered is a valid mongo object id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // Check to see if the completed flag is a boolean and it is set to true
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // Query to update the database
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {

    // Check to see if the object was found - if not return with 404 error
    if (!todo) {
      return res.status(404).send();
    }

    // Happy scenario here
    res.send({ todo });
  }).catch((error) => {
    res.status(400).send();
  });

});

// POST / users
app.post('/users', (req, res) => {

  var userData = _.pick(req.body, ['email', 'password']);

  var user = new User(userData);

  // Save the user - first generate token which returns token as promise which then sends success or catches error
  user.save().then(() => {

    user.generateAuthToken()

  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((error) => {
    res.status(400).send(error);
  });

});

app.listen(port, () => {
  console.log(`Started on Port ${port}`);
});


module.exports = { app };