const authenticate = require("./auth");

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
