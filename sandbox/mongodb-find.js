//const MongoClient = require('mongodb').MongoClient;

// The commented command above can be replaced by new ES6 object descructuring
const { MongoClient, ObjectID } = require('mongodb');

// API Documentation - https://mongodb.github.io/node-mongodb-native/

// Connect to the mongh database - providing a callback function with two arguements, err and if successful a db object
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    // if err object exists then return our of this callback
    return console.log('Unable to connect to MongoDB Server');
  }

  // Here we have connected to the database
  console.log('Connected to the MongoDB Server');
  const db = client.db('TodoAPP');


  // Will return an array of documents - returns a promise
  // db.collection('Todos').find().toArray().then((docs) => {                        <----  all documents
  // db.collection('Todos').find({ completed: false }).toArray().then((docs) => {    <---- completed = false
  // db.collection('Todos').find({ completed: true }).toArray().then((docs) => {     <---- completed = true

  // db.collection('Todos').find({
  //   _id: new ObjectID('5b8955f47c18ce0114f7934f')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos documents');
  // })

  db.collection('Users').find({ name: 'Norma Jean' }).toArray().then((docs) => {
    console.log('User:');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch User document');
  })


  // Count the number of Documents in a collection
  db.collection('Todos').find().count().then((docCount) => {
    console.log(`Todos Document Count: ${docCount}`);
  }, (err) => {
    console.log('Unable to fetch Todos documents');
  })

  db.collection('Users').find().count().then((docCount) => {
    console.log(`Users Document Count: ${docCount}`);
  }, (err) => {
    console.log('Unable to fetch Users documents');
  })

  // The final line in this callback should be closing the database
  client.close();
});

