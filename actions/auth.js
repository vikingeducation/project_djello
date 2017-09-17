const { User } = require("../models");

const _success = (client, user, callback) => {
  console.log("Logged in!");
  client.user = user;
  client.emit("authSuccess", user.token);
  callback(null, true);
};

const _failure = (client, callback) => {
  console.log("Failed to authenticate!");
  client.user = null;
  client.emit("authFail");
  callback(new Error("Bad username/password/token"));
};

const auth = async (client, data, callback) => {
  const { username, password, token, register } = data;
  try {
    let user;
    if (register) {
      console.log("Registering: ", username);
      user = await User.create({ username, password });
      _success(client, user, callback);
    } else if (token) {
      console.log("Token Auth...");
      user = await User.findOne({ token });
    } else {
      console.log("Credential Login: ", username);
      user = await User.findOne({ username });
      user = user.validPassword(password) ? user : null;
    }
    user ? _success(client, user, callback) : _failure(client, callback);
  } catch (error) {
    console.error(error.message);
    console.error(error.stack);
    callback(error);
  }
};

module.exports = auth;
