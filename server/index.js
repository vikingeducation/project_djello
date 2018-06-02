// app.js

// express ====================================================================
const express = require('express');
const app 	  = express();

const config = require('./config/main')
// mongoose
const mongoose = require('mongoose');
mongoose.connect(config.database);

// logging
const logger = require('morgan');
const morganToolkit = require('morgan-toolkit')(logger);
app.use(morganToolkit());

// body parser ================================================================
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable CORS from client-side ===============================================
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// passport 
const passport = require('passport');
const passportService = require('./config/passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// router
const authRouter = require('./routes/auth')(requireLogin);
const userRouter = require('./routes/user');

app.use('/users', userRouter);



// server  ====================================================================
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
  console.log(`Find the server at ${app.get('port')}`);
});

