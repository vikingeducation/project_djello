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

const checkCookieRouter = function(req, res) {
  if (req.body.signature) {
    const [username, signature] = req.body.signature.split(":");
    User.findOne({ where: { username: username } }).then(user => {
      if (signature === generateSignature(user.username)) {
        res.status(200).send({ data: { match: true } });
      } else {
        res.status(200).send({ data: { match: false } });
      }
    });
  } else {
    res.status(200).send({ data: { match: false } });
  }
};

//Login Router
const loginRouter = function(req, res) {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (user && validatePassword(user.passwordHash, req.body.password)) {
        console.log("User Found!!!!");
        res
          .status(200)
          .send({ data: createSignedSessionId(req.body.username) });
      } else {
        console.log("No User Found!!!");
        res.status(404).send({ Error: "User Not Found" });
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

//Signup Router
const signupRouter = function(req, res) {
  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (user) {
        res.status(400).send({ Error: "Unique Name Needed" });
      } else {
        const hPass = setPassword(req.body.password);
        const createParams = {
          username: req.body.username,
          passwordHash: hPass
        };
        User.create(createParams)
          .then(user => {
            console.log("User created!!!!");
            res
              .status(200)
              .send({ data: createSignedSessionId(req.body.username) });
          })
          .catch(e => res.status(500).send(e.stack));
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

//Tables Router
const tablesRouter = function(req, res) {
  //return data for tables
  User.findAll().then(users => {
    console.log(users);
  });
  res.send("Tables ok");
};

module.exports = { checkCookieRouter, loginRouter, signupRouter, tablesRouter };
