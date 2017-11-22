const bcrypt = require("bcrypt");
const models = require("./models");
const User = models.User;
const sequelize = models.sequelize;
const Op = require("sequelize").Op;
const secret = process.env["SECRET"] || "lavalamp";
const md5 = require("md5");

//Password
const validatePassword = function(hashedPassword, password) {
  return bcrypt.compareSync(password, hashedPassword);
};

const setPassword = function(value) {
  return bcrypt.hashSync(value, 8);
};

//Signature
const generateSignature = function(username) {
  return md5(username + secret);
};

const createSignedSessionId = function(username) {
  return `${username}:${generateSignature(username)}`;
};

const checkSignature = function(sessionId) {
  const [username, signature] = sessionId.split(":");
  User.findOne({ username: username }, (err, user) => {
    if (signature === generateSignature(username)) {
      return true;
    } else {
      return false;
    }
  });
};

//Login Router
const loginRouter = function(req, res) {
  if (req.signature && checkSignature(req.signature)) {
    res.send(req.signature);
  }
  if (req.username && req.password) {
    User.findOne({
      where: {
        username: req.username
      }
    })
      .then(user => {
        console.log("Find", user);
        if (validatePassword(user.passwordHash, req.password)) {
          res.send(createSignedSessionId(user.username));
        } else {
          res.send("None");
        }
      })
      .catch(e => {
        console.log("Err", e);
        res.status(500).send(e.stack);
      });
  } else {
    res.send("None");
  }
  //check if cookie?
  ////if cookie send back cookie verifid?
  //else if username is in db and sent password matchs hashed password in db
  ////send back cookie
  //else send back no good
  res.send("Login ok");
};

//Signup Router
const signupRouter = function(req, res) {
  //check if cookie?
  ////if cookie send back no good
  //else if username isnt in database
  ////add username to db with hashed password
  ////send back cookie
  //else
  ////send back no good
  res.send("Signup ok");
};

//Tables Router
const tablesRouter = function(req, res) {
  //return data for tables
  res.send("Tables ok");
};

module.exports = { loginRouter, signupRouter, tablesRouter };
