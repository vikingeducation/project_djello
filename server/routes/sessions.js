const express = require("express");
const router = express.Router();
const models = require("./../models");
const User = models.User;

router.get("/", (req, res) => {
  res.json("token")
});
router.post("/", (req, res) => {
  res.json({token: "abc"})
});

module.exports = router;