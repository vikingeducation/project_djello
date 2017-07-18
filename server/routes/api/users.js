const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        throw new Error("Could not find user");
      }

      res.json({ data: user });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.get("/:id/boards", (req, res, next) => {
  User.findById(req.params.id)
    .populate({
      path: "boards"
    })
    .then(user => {
      res.json({ data: user.boards });
    })
    .catch(error => next(error));
});

router.get("/", (req, res, next) => {
  User.find({})
    .then(users => {
      res.json({ data: users });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
