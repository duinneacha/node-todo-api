// Mongoose
const mongoose = require('mongoose');

// The following line sets the mongoose promise set to the default promise set
// You could also have used a third party promise set such as bluebird
// Mongoose used promises before ES6 incorporated it from module bluebird
// mongoose.Promise = require('bluebird');

mongoose.Promise = global.Promise;

// Connect to a database
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Create a model - so that mongoose knows how to store our data - the attributes we want it to have
// (Mongo can store schema less data in documents - mongoose likes a model)

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// User Model
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});


var newUser = new User({
  email: 'duinneacha@gmail.com'
});

newUser.save().then((newUSerDocument) => {
  console.log('USer created successfully', newUser);
}, (error) => {
  console.log('Unable to create new user', error)
});

// Create a new object to add to the collection

// var newTodo = new Todo({
//   text: true
// });

// // Add new object to the collection with save() - this returns a promise with two arguements - success & error
// newTodo.save().then((newTodoDocument) => {
//   console.log('Saved todo', newTodoDocument);
// }, (error) => {
//   console.log('Unable to save todo document', error);
// });

// Create a new instance of the Todo model calling it adNewTodo
// var adNewTodo = new Todo({
//   text: 'Pick up pressie for Goddaughter',
//   completed: false,
//   completedAt: 32423
// })

// Add new doc
// adNewTodo.save().then((newAdTodoDocument) => {
//   console.log('Saved new todo', newAdTodoDocument);
// }, (error) => {
//   console.log('Unable to save todo document');
// });



