const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

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

router.get('/', (req, res)=>{
  console.log(req)
  req.user ? res.redirect('/boards') : res.redirect('/login')
  })



module.exports = router