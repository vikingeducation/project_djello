const express = require("express");
const app = express();
const path = require('path');
require("dotenv").config({ path: path.join(__dirname,"../.env") });

// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------------------
// Logging
// ----------------------------------------
const morgan = require("morgan");
const highlight = require("cli-highlight").highlight;

// Add :data format token
// to `tiny` format
let format = [
  ":separator",
  ":newline",
  ":method ",
  ":url ",
  ":status ",
  ":res[content-length] ",
  "- :response-time ms",
  ":newline",
  ":newline",
  ":data",
  ":newline",
  ":separator",
  ":newline",
  ":newline"
].join("");

// Use morgan middleware with
// custom format
if (process.env.NODE_ENV !== "test") {
  app.use(morgan(format));
}

// Helper tokens
morgan.token("separator", () => "****");
morgan.token("newline", () => "\n");

// Set data token to output
// req query params and body
morgan.token("data", (req, res, next) => {
  if (/\.[\w]+$/.test(req.url)) {
    return "";
  }

  let data = [];
  ["query", "params", "body", "session", "user"].forEach(key => {
    if (req[key]) {
      let capKey = key[0].toUpperCase() + key.substr(1);
      let value = JSON.stringify(req[key], null, 2);
      data.push(`${capKey}: ${value}`);
    }
  });
  data = highlight(data.join("\n"), {
    language: "json",
    ignoreIllegals: true
  });
  return `${data}`;
});

// ----------------------------------------
// Mongoose
// ----------------------------------------
const mongoose = require("mongoose");

app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./mongo")().then(() => next());
  }
});

// ----------------------------------------
// Routes
// ----------------------------------------
const sessions = require("./routes/sessions");
const djelloApi = require("./routes/api");
app.use("/sessions", sessions);
app.use("/api/v1", djelloApi);

// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT || process.argv[2] || 4000;
const host = "localhost";

let args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {console.log(`Listening: http://${ host }:${ port }`)});

if (require.main === module) {
  app.listen.apply(app, args);
}

// ----------------------------------------
// Error Handling
// ----------------------------------------
app.use("/api", (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let errorType;
  if (err.stack) {
    err = err.stack;
    errorType = err.split(":")[0];
  }

  if (errorType == "UnauthorizedError") {
    res.status(401).json({ error: err });
  } else {
    res.status(500).json({ error: err });
  }
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.stack) {
    err = err.stack;
  }
  res.status(500).json({ error: err });
});

module.exports = app;
