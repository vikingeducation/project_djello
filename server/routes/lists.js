const { User } = require("../models");
const router = require("express").Router();

router.get("/", (req, res) => {
  //get the user
  //authenticate

  //TODO: work out the filtering
  const { board, user } = req.query;
  User.findOne({
    username: user
  });

  return res.sendStatus(501);
});

router.post("/", (req, res) => {
  return res.sendStatus(501);
});

router.put("/", (req, res) => {
  return res.sendStatus(501);
});

router.delete("/", (req, res) => {
  return res.sendStatus(501);
});

module.exports = router;
