var logger = require("morgan"),
  cors = require("cors"),
  http = require("http"),
  express = require("express"),
  errorhandler = require("errorhandler"),
  dotenv = require("dotenv"),
  bodyParser = require("body-parser");

var app = express();

dotenv.load();

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

app.use(function(err, req, res, next) {
  if (err.name === "StatusError") {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
  app.use(errorhandler());
}

app.use(require("./user-routes"));
app.use(require("./db-routes"));

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function(err) {
  console.log("listening in http://localhost:" + port);
});
