const { Users } = require("../controllers/index");

module.exports = server => {
  const io = require("socket.io")(server);

  io.on("connection", client => {
    client.on("login", async user => {
      const isValid = await Users.validateUser(user.email, user.password);
      client.emit("isValidUser", { email: user.email, isValid });
    });
  });
};
