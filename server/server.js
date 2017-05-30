var express = require("express");

var app = express();

var logger = require("morgan"),
  cors = require("cors"),
  dotenv = require("dotenv"),
  bodyParser = require("body-parser");

dotenv.load();
var auth = require("./auth.js")();
// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//---------------------------------------
//Set response headers for CORS
//---------------------------------------
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(cors());

app.use(auth.initialize());

app.get("/", function(req, res) {
  res.json({
    status: "My API is alive!"
  });
});

app.use(require("./user-routes"));
app.use("*", auth.authenticate(), function(req, res, next) {
  next();
});
app.use(require("./db-routes"));

app.listen(3001, function() {
  console.log("My API is running...");
});

module.exports = app;
