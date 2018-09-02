const mongoose = require('mongoose');

// User Model
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});


module.exports = { User };

// var newUser = new User({
  //   email: 'duinneacha@gmail.com'
  // });

  // newUser.save().then((newUSerDocument) => {
  //   console.log('USer created successfully', newUser);
  // }, (error) => {
  //   console.log('Unable to create new user', error)
  // });
