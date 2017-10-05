const validate = require("validate.js");
const { User } = require("../models");

const constraints = {
  username: { presence: true, length: { minimum: 2 } },
  password: { presence: true, length: { minimum: 2 } }
};

const authenticate = async (client, data, callback) => {
  const { username, password, token, register } = data;
  let message = "Invalid username or password";
  try {
    let user;
    if (register && !validate({ username, password }, constraints)) {
      message = "Unavailable username";
      user = await User.create({ username, password });
    } else if (token) {
      message = "Expired session";
      user = await User.findOne({ token });
    } else {
      // explicitly grab passwordHash to validate password
      user = await User.findOne({ username }, { passwordHash: 1 });
      // grab a regularly-projected user if password is valid
      user =
        user && user.validPassword(password)
          ? await User.findOne({ username })
          : null;
    }

    if (user) {
      client.user = user;
      client.emit("authSuccess", user);
      callback(null, true);
    } else {
      throw new Error(message);
    }
  } catch (error) {
    console.error(error.message);
    client.user = null;
    client.emit("authFail", message);
    callback(new Error(message));
  }
};

const postAuthenticate = client => {
  require("./boards")(client);
  require("./cards")(client);
  require("./lists")(client);
};

const actions = io => {
  require("socketio-auth")(io, {
    authenticate,
    postAuthenticate,
    timeout: "none"
  });
};

module.exports = actions;
