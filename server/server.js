if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var express = require("express");

var app = express();

var logger = require("morgan"),
  cors = require("cors"),
  bodyParser = require("body-parser");

app.set("port", process.env.PORT || 3001);

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

app.get("/", function(req, res) {
  res.json({
    status: "My API is alive!"
  });
});
app.use(auth.initialize());

app.use(require("./user-routes"));
app.use("*", auth.authenticate(), function(req, res, next) {
  next();
});
app.use(require("./db-routes"));

// Defines next action for errors
function errorHandler(err, req, res, next) {
  console.error(`Error: ${err.stack}`);
  res.status(err.response ? err.response.status : 500);
  res.json({
    error: err.message
  });
}

// Tell the app to use the errorHandler middleware
app.use(errorHandler);

app.listen(app.get("port"), function() {
  console.log("My API is running...");
});
