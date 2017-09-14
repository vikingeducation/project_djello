const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;

const { User } = require("./models");

const localAuth = async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    !user || !user.validPassword(password)
      ? done(null, false, { message: "Invalid username/password" })
      : done(null, user);
  } catch (error) {
    done(error);
  }
};

const bearerAuth = async (token, done) => {
  try {
    const user = await User.findOne({ token: token });
    user
      ? done(null, user || false)
      : done(null, false, { message: "Invalid user token" });
  } catch (error) {
    done(error);
  }
};

const local = new LocalStrategy(localAuth);
const bearer = new BearerStrategy(bearerAuth);

module.exports = { local, bearer };
