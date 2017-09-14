const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const { User } = require("./models");

io.on("connection", client => {
  console.log("connected!");
  console.log(client.id);
});

// .env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Post Data
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Session
const expressSession = require("express-session");
app.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret: "asdf;werxcklj;jxcvui3qksf;"
  })
);

// Log Request Info
const morgan = require("morgan");
const morganToolkit = require("morgan-toolkit")(morgan);
app.use(morganToolkit());

// Connect to Mongoose
const mongoose = require("mongoose");
app.use((req, res, next) => {
  if (mongoose.connection.readyState) next();
  else require("./mongo")().then(() => next());
});

// Authentication
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
  User.findById(userId, (err, user) => done(err, user));
});

// Authentication Strategies
const { local, bearer } = require("./strategies");
passport.use("local", local);
passport.use("bearer", bearer);

// Routes
app.use("/auth", require("./routes/auth")(passport));
app.use("/api", require("./routes/api"));

// 404 Handler
app.get("*", (req, res) => {
  res.json({ error: "404 Not Found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Set up port/host
const port = process.env.PORT || process.argv[2] || 3001;
const host = "localhost";
let args = process.env.NODE_ENV === "production" ? [port] : [port, host];

// Helpful log when the server starts
args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

// Start it up!
server.listen(...args);
