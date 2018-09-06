// The Authentication method used to verify a users token

const { User } = require('./../models/user');

const authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  // Going to access a method in the User schema
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;

    next();

  }).catch((error) => {
    res.status(401).send();
  });

};



module.exports = { authenticate };