const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


// Using a Schema allows us to tag on methods
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// Adding methods to the User Schema

// Override the return of a user object - We do not want to return all the data - i.e. dont return password
UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// Generate Authorisation Tokens - using function as arrow does not bind "this"
UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

  // Add the access and token to the tokens array on the user object
  user.tokens = user.tokens.concat([{ access, token }]);

  // Save the changes above
  user.save().then(() => {
    return token;
  });
};

// User Model passing in the Schema
const User = mongoose.model('User', UserSchema);


module.exports = { User };

// var newUser = new User({
  //   email: 'duinneacha@gmail.com'
  // });

  // newUser.save().then((newUSerDocument) => {
  //   console.log('USer created successfully', newUser);
  // }, (error) => {
  //   console.log('Unable to create new user', error)
  // });
