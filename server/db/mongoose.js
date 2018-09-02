// Mongoose
const mongoose = require('mongoose');

// The following line sets the mongoose promise set to the default promise set
// You could also have used a third party promise set such as bluebird
// Mongoose used promises before ES6 incorporated it from module bluebird
// mongoose.Promise = require('bluebird');

mongoose.Promise = global.Promise;

// Connect to a database
mongoose.connect('mongodb://127.0.0.1:27017/TodoApp', { useNewUrlParser: true });

// Create a model - so that mongoose knows how to store our data - the attributes we want it to have
// (Mongo can store schema less data in documents - mongoose likes a model)



module.exports = { mongoose };