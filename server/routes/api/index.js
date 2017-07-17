const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        throw new Error("Could not find user");
      }

      res.json({data: user});
    })
    .catch(error => {
      res.status(400).json({error});
    });
});

router.get('/users', (req, res) => {
  res.json('123');
});
module.exports = router;