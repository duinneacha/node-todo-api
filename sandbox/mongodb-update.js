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

  // Find One and Update
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b89b6ba7c18ce0114f7ad08')
  // }, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(result);
  //   });


  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b89302211940014c4a7cc04')
  }, {
      $set: {
        name: 'Aidan Dennehy 22222'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    });

  // The final line in this callback should be closing the database
  client.close();
});

