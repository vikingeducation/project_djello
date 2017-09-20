const User = require("../models/User");

const localStrategy = (username, password, done) => {
  User.findOne({
    email: username
  }, (err, user) => {
    if (err) return done(err);
    if (user && user.validatePassword(password)) {
      return done(null, user);
    }
    if (!user) {
      return done(null, false, {message: 'Could not find a registered user with that email address'});
    } else {
      return done(null, false, { message: "Could not validate password" });
    }
  });
};

module.exports = localStrategy;