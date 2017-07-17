const express = require("express");
const router = express.Router();
const models = require("./../models");
const User = models.User;

router.get("/", (req, res) => {
  res.json("token")
});
router.post("/", (req, res) => {
  let {email, password} = req.body;
  User.find({email, password})
    .then(user => {
      if (!user) {
        throw new Error("User could not be found");
      }
    })
    .catch(error => {
      res.json({error});
    });
  res.json({token: "abc"})
});

module.exports = router;