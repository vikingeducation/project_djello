const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressSession = require('express-session');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const localStrategy = require("./strategies/local");
const User = require('./models/User.js');

require("dotenv").config();

app.use(bodyParser.json())
//const urlencodedParser = bodyParser.urlencoded({ extended: false })
//jsonParser = bodyParser.json()
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(
  expressSession({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET || 'myostatin'
  })
);

app.use((req, res, next) =>{
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo.js')().then(() => {
      next();
    })
  }
})

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Routes
const routes = require('./routes/routes.js')
app.use('/', routes);

// Server 
const port = process.env.PORT || process.argv[2] || 3001;
const host = "localhost";
let args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);
args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

app.listen.apply(app, args);

module.exports = app;



