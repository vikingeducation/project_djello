// npm modules / packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const morgan = require("morgan");
const morganToolkit = require("morgan-toolkit")(morgan);
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const passportLocal = require("passport-local");

// import local configurations
const configs = require("./server-configs");

// import middleware
const mw = require("./middleware");

// import local routers
const routers = require("../routers");

//import passport strategies
const localStrategy = require("../strategies/local");

// configure environment variables
dotenv.config();

// middleware registration
app.use(morgan(configs.morgan));
app.use(cookieParser("candlelight"));
app.use(bodyParser.json(configs.bodyParser));
app.use(expressSession(configs.session));
app.use(morganToolkit());
app.use(methodOverride(getPostSupport.callback, getPostSupport.options));
app.use(mw.startMongo(mongoose));
app.use(mw.logConnections);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

// set up Passport strategies
passport.use(new passportLocal.Strategy(localStrategy));
passport.serializeUser(configs.passportSerializeUser);
passport.deserializeUser(configs.passportDeserializeUser);

app.use("/:param", routers(passport));

// start server
const { port, host, serverCallback } = require("./server-configs");
let args = process.env.NODE_ENV === "production" ? [port] : [port, host];
args.push(serverCallback({ port, host }));
app.listen.apply(app, args);

module.exports = app;
