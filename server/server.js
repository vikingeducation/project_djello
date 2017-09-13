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
const flash = require("express-flash");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const passportLocal = require("passport-local");

// import local configurations
const configs = require("./server-configs");
const localStrategy = require("../strategies/local");
const mw = require("./middleware");

// configure environment variables
dotenv.config();

// set up Passport Local Strategy
passport.use(new passportLocal.Strategy(localStrategy));

// middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession(configs.session));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(morganToolkit());
app.use(methodOverride(getPostSupport.callback, getPostSupport.options));
app.use(mw.startMongo(mongoose));

app.get("/", (req, res) => {
  res.send("started");
});

// start server
const { port, host, serverCallback } = require("./server-configs");
let args = process.env.NODE_ENV === "production" ? [port] : [port, host];
args.push(serverCallback({ port, host }));
app.listen.apply(app, args);

module.exports = app;
