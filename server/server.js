// Start the server
const server = require("http").createServer();
const io = require("socket.io")(server);

// Connect to Mongoose
const mongoose = require("mongoose");
io.use((socket, next) => {
  if (mongoose.connection.readyState) next();
  else
    require("./mongo")()
      .then(() => next())
      .catch(e => console.error(e.stack));
});

// Handle Socket.io events
require("./actions")(io);

// Set up port/host
const port = process.env.PORT || process.argv[2] || 3001;
const host = "localhost";

// Helpful log when the server starts
const logger = () => console.log(`Listening: http://${host}:${port}`);

// Assemble server args
const inProduction = process.env.NODE_ENV === "production";
const args = inProduction ? [port] : [port, host, logger];

// Start it up!
server.listen(...args);
