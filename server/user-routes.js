var express = require("express"), _ = require("lodash");
var jwt = require("jwt-simple");
const models = require("./models");
const User = models.User;
const sequelize = models.sequelize;
const bcrypt = require("bcrypt");

var app = (module.exports = express.Router());

app.post("/sessions/create", function(req, res) {
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ where: { email: req.body.email } }).then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        var payload = {
          id: user.id
        };
        var token = jwt.encode(payload, process.env.JWT_SECRET);
        res.status(201).send({
          token: token,
          userId: user.id,
          userEmail: user.email
        });
      } else {
        res.status(401).send({ error: "The email or password don't match" });
      }
    });
  } else {
    res.status(401).send({ error: "The email or password don't match" });
  }
});
