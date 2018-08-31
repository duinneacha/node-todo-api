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


  console.log('Connected to the MongoDB Server');
  const db = client.db('TodoAPP');

  // Delete Many
  // db.collection('Todos').deleteMany({ text: 'eat brekkie' }).then((result) => {
  //   console.log(result);
  // });


  // Delete One - will only delete the *first* encountered record matching the specified criteria
  // db.collection('Todos').deleteOne({ text: 'eat brekkie' }).then((result) => {
  //   console.log(result);
  // });

  // Find One and Delete -> in the result object - the deleted document is returned within
  // db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
  //   console.log(result);
  // });


  // db.collection('Users').deleteMany({ name: 'Jasper McElroy' }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({ _id: new ObjectID("5b893bc7b3258c2f8c909261") }).then((result) => {
    console.log(result);
  });

  // The final line in this callback should be closing the database
  client.close();
});

