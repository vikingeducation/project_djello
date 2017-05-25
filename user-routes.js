var express = require("express"),
  _ = require("lodash"),
  jwt = require("jsonwebtoken");
const models = require("./models");
const User = models.User;
const sequelize = models.sequelize;
const bcrypt = require("bcrypt");

var app = (module.exports = express.Router());

function createIdToken(user) {
  return jwt.sign(_.omit(user, "password"), process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 5
  });
}

function createAccessToken() {
  return jwt.sign(
    {
      iss: process.env.JWT_ISSUER,
      aud: process.env.JWIT_AUDIENCE,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      scope: "full_access",
      sub: "djello|gonto",
      jti: genJti(), // unique identifier for the token
      alg: "HS256"
    },
    process.env.JWT_SECRET
  );
}

// Generate Unique Identifier for the access token
function genJti() {
  let jti = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 16; i++) {
    jti += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return jti;
}

app.post("/users", function(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }
  User.findOne({ where: { email: req.body.email } }).then(user => {
    if (user) {
      return res.status(400).send("A user with that email already exists");
    }
    User.create({
      email: req.body.email,
      password: req.body.password
    }).then(user => {
      res.status(201).send({
        id_token: createIdToken(user),
        access_token: createAccessToken()
      });
    });
  });
});

app.post("/sessions/create", function(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }

  User.findOne({ where: { email: req.body.email } }).then(user => {
    if (!user) {
      return res.status(401).send("The email or password don't match");
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send("The email or password don't match");
    }
    res.status(201).send({
      id_token: createIdToken(user),
      access_token: createAccessToken()
    });
  });
});
