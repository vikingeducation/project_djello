const router = require("express").Router();
const { User } = require("../models");

/* GET users listing. */
router.get("/", (req, res, next) => {
  User.find()
    .then(users => {
      return res.json(users);
    })
    .catch(err => {
      next(err);
    });
});
router.get("/:id", (req, res) => {
  return res.send("users");

  //get user from database
  res.json(user);
});

module.exports = router;
