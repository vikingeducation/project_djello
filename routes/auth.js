const express = require("express");
const router = express.Router();
const h = require("../helpers");
const { User } = require("../models");

// Route Handlers
function authenticate(passport) {
  //login handler
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: h.loginPath(),
      failureFlash: true
    })
  );

  //register handler
  router.post("/register", (req, res, next) => {
    const { username, password } = req.body;
    User.registerNewUser(username, password, id)
      .then(user => {
        req.login(user, err => {
          if (err) next(err);
          else res.redirect("/");
        });
      })
      .catch(e => res.status(500).end(e));
  });

  //logout handler
  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  return router;
}

module.exports = authenticate;
