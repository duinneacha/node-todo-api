// Mongoose

require('./../config/config');

const mongoose = require('mongoose');

// The following line sets the mongoose promise set to the default promise set
// You could also have used a third party promise set such as bluebird
// Mongoose used promises before ES6 incorporated it from module bluebird
// mongoose.Promise = require('bluebird');

mongoose.Promise = global.Promise;

// Connect to a database!!!!!! USE 127.0.0.1 line for localhost and mlab for Heroku

//mongoose.connect('mongodb://127.0.0.1:27017/TodoApp', { useNewUrlParser: true });

var env = process.env.NODE_ENV || 'development';

if (env === 'production') {
  mongoose.connect('mongodb://admin:Passw0rd@ds243812.mlab.com:43812/adtodos', { useNewUrlParser: true });
} else if (env === 'development') {
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
  console.log('Connecting to MongoDB locally!');
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
} else {
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
}




// Create a model - so that mongoose knows how to store our data - the attributes we want it to have
// (Mongo can store schema less data in documents - mongoose likes a model)



module.exports = { mongoose };