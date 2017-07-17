const express = require("express");
const router = express.Router();
const models = require("./../models");
const User = models.User;
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        throw new Error("User could not be found");
      }

      let isPasswordValid = user.validatePassword(password);
      if (!isPasswordValid) {
        throw new Error("Could not authenticate user");
      }

      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );
      res.json({ token });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
