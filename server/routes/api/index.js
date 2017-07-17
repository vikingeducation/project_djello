const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;
const jwtAuth = require('express-jwt');

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

router.get('/users', 
  jwtAuth({secret: process.env.JWT_SECRET}),
  (req, res, next) => {
    User.find({}).then(users => {
      res.json({data: users});
    })
    .catch(error => { next(error) });
});
module.exports = router;