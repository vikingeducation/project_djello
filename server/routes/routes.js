const express = require("express");
const router = express.Router();
const {User, Board, List, Card, Activity} = require("../models");

// Middleware to protect routes
const loggedInOnly = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};
const loggedOutOnly = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    res.redirect("/boards");
  }
};

// routes
// get a user
router.get('/api/v1/users/:id', (req, res)=>{
  User.findById(req.params.id)
  .populate({
      path: "boards",
      populate: {
        path: "lists",
        populate: {
          path: "cards",
          populate: {
            path: "activities"
          },
          populate: {
            path: "users"
          }
        }
      }
    })
    .then(user => {
      if (!user) {
        throw new Error("Could not find user");
      }
      res.json(user);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

//router.get('/api/v1/boards')




module.exports = router