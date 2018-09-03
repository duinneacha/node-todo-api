// Some examples of mongoose remove

const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}) - remove all documents
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove is similar but can add extra field criteria
Todo.findOneAndRemove({ text: "xxxxAnother" }).then((todo) => {
  console.log(todo);
});


// FindByIDAndRemove
// Todo.findByIdAndRemove('5b8daec9380db8200c082ed6').then((todo) => {
//   console.log(todo);
// });


