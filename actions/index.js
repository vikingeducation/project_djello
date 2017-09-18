const authenticate = require("./auth");
const boardActions = require("./boards");

const postAuthenticate = client => {
  boardActions(client);
};

const actions = io => {
  require("socketio-auth")(io, {
    authenticate,
    postAuthenticate,
    timeout: "none"
  });
  io.on("connection", client => {
    console.log("New connection!");
    client.on("disconnect", () => console.log("Disconnected!"));
  });
};

module.exports = actions;
