const mongoose = require('mongoose');


// Todo object model
const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

// Examples of how to hardwire new objects into a Todo
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



module.exports = { Todo };