const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
  return user.save().then(() => {
    return token;
  });
};

// Remove a token from the User Object - a.k.a. logging the user out

UserSchema.methods.removeToken = function (token) {
  var user = this;

  // Update the user object using the mongoose $pull method that will remove whatever is specified
  // In this instance we are removing the passed in token
  return user.update({
    $pull: {
      tokens: { token }
    }
  });
};


// statics is an object that turns into a model method as opposed to an instance method
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  // jwt.verify will throw an error if anything goes wrong - hence the try/catch
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (error) {

    // return a promise that will always reject
    // return new Promise((resolve, reject) => {
    //   reject();
    // })

    // Return a rejected promise - more elegantly than above
    return Promise.reject();

  }

  // Happy scenario here - successfully decoded the token that was passed with the header
  // findOne returns a promise which is returned to the calling method
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};


// Find user by credentials - used at login
UserSchema.statics.findByCredentials = function (email, password) {

  var User = this;

  // Try to find the user in the user database
  return User.findOne({ email }).then((user) => {

    // If the user is not found return rejected promise
    if (!user) {
      return Promise.reject();
    }

    // The user will exist if the code lands here
    return new Promise((resolve, reject) => {

      // use bcrypt to compare user password with inputted password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      })

    });

  });
};

// Method that runs as part of Mongoose Middleware just before a save - hash the password
UserSchema.pre('save', function (next) {
  var user = this;

  // We only want to encrypt the password if it was modified - check for this here
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (error, saltValue) => {
      bcrypt.hash(user.password, saltValue, (error, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }

});

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
