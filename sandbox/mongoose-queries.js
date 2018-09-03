// Some examples of mongoose queries

const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


//const testID = 'x5b8c630dc474a21c34da7453';
const testID = '5b8ab0a52028e43750d77a01';

if (!ObjectID.isValid(testID)) {
  return console.log(`${testID} is not valid!`);
}

// This would return an array of documents
// Todo.find({
//   _id: testID
// }).then((todos) => {
//   if (todos.length == 0) {
//     return console.log(`${testID} not found`);
//   }
//   console.log('Todos', todos);
// }, (error) => {
//   console.log(`Unable to find ${testID}`)
// });

// This would return an individual document
// Todo.findOne({
//   _id: testID
// }).then((todo) => {
//   if (!todo) {
//     return console.log(`${testID} not found`);
//   }
//   console.log('Todo', todo);
// }, (error) => {
//   console.log(`Unable to find ${testID}`);
// });


// Todo.findById(testID).then((todo) => {
//   if (!todo) {
//     return console.log(`${testID} not found`);
//   }
//   console.log('Todo', todo);
// }).catch((error) => console.log('Error: ', error.message));


User.findById(testID).then((user) => {
  if (!user) {
    return console.log(`${testID} is not found`);
  }
  console.log('User', user);
}).catch((error) => console.log('Error: ', error.message));
