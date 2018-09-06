// hashing sandbox

const { SHA256 } = require('crypto-js');

// jsonwebtokens = npm install --save jsonwebtokens - returns two methods - sign & verify
const jwt = require('jsonwebtoken');


const bcrypt = require('bcryptjs');



var password = '123abc!';

console.log('password:', password);

// hash the password

// bcrypt.genSalt(10, (error, saltValue) => {
//   bcrypt.hash(password, saltValue, (error, hash) => {
//     console.log('hashed password:', hash);
//   });
// });

var hashedPassword = '$2a$10$cUyulfsh.ts7JfPRqreHxumN3G0bSElUSqluj6/HAOFi1iYddj7MK';

bcrypt.compare(password, hashedPassword, (error, result) => {
  console.log(result);
})


// var data = {
//   id: 10,
//   name: 'Object NAme'
// };

// console.log('Original data:', data);

// jwt.sign takes an object and secret and returns a token
// var token = jwt.sign(data, 'abc123');
// console.log('token:', token);


// // jwt.verify takes a token and the secret and returns the original object
// var decodedToken = jwt.verify(token, 'abc123');
// console.log('decodedToken:', decodedToken);


// let message = 'I am a user of the Todo system.';

// hash the message using SHA256
// SHA256 returns an object - needs to be converted to a string
// let hashMessage = SHA256(message).toString();


// console.log(`Message: ${message}`);
// console.log(`hashed Message: ${hashMessage}`);

// var data = {
//   id: 7
// };

// Sending the data object is very insecure - to add security - add hash

// adding a string of characters to the end of the hash is called "salting"
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };


// console.log('data', data);
// console.log('token', token);

// Simulating man in the middle attack would be to change the ID and hash - they will not know the salt string as this resides on the server

// token.data.id = 9;
// token.hash = SHA256(JSON.stringify(token.data)).toString();


// This is a simulation of a comparason of a returning object to see that the hashtag is the same and therefore not altered

// var resultHash = SHA256(JSON.stringify(data) + "somesecret").toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('WARNING!!" - Data was changed');
// }


