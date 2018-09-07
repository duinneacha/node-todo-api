// Seed Data for Tests

const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');


const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const dummyUsersData = [
  {
    _id: userOneID,
    email: 'dan@email.com',
    password: 'password01',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userOneID, access: 'auth' }, 'abc123').toString()
    }]
  },
  {
    _id: userTwoID,
    email: 'jess@another.com',
    password: 'userTwoPassword',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userTwoID, access: 'auth' }, 'abc123').toString()
    }]
  }
];


const populateUsers = (done) => {
  User.deleteMany({}).then(() => {
    var userOne = new User(dummyUsersData[0]).save();
    var userTwo = new User(dummyUsersData[1]).save();

    return Promise.all([userOne, userTwo])

  }).then(() => {
    done();
  });
};

const dummyTodoData = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneID
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 238746,
  _creator: userTwoID
}];



const populateTodos = (done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(dummyTodoData);
  }).then(() => done());
};


module.exports = {
  dummyTodoData,
  populateTodos,
  dummyUsersData,
  populateUsers
};