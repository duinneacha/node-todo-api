//const MongoClient = require('mongodb').MongoClient;

// The commented command above can be replaced by new ES6 object descructuring
const { MongoClient, ObjectID } = require('mongodb');

// ObjectID allows us to create an object ID similar to the way Mongo creates one - obj will be unique
// var obj = new ObjectID();
// console.log(obj);

// Connect to the mongh database - providing a callback function with two arguements, err and if successful a db object
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    // if err object exists then return our of this callback
    return console.log('Unable to connect to MongoDB Server');
  }

  // Here we have connected to the database
  console.log('Connected to the MongoDB Server');
  const db = client.db('TodoAPP');

  // Insert a new document into the collection
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }

  //   // Pretty print ops - attrubute of result object that stores the docs that were inserted
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert a document into the Users database
  db.collection('Users').insertOne({
    name: 'Aidan Dennehy',
    age: 48,
    location: 'Cork'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert a document in Users', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  });


  // The final line in this callback should be closing the database
  client.close();
});

