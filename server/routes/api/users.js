const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;
const Board = models.Board;
const { apiMessages } = require("./../../helpers");

/*  ===============
  Get User
================ */
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

/*  ===============
  Get User Boards
================ */
router.get("/:id/boards", (req, res, next) => {
  User.findById(req.params.id)
    .populate({
      path: "boards",
      populate: {
        path: "lists",
        populate: {
          path: "cards",
          populate: {
            path: "members"
          }
        }
      }
    })
    .then(user => {
      res.json({ data: user.boards });
    })
    .catch(error => next(error));
});

/*  ===============
  Get All Users
================ */
router.get("/", (req, res, next) => {
  User.find({})
    .then(users => {
      res.json({ data: users });
    })
    .catch(error => {
      next(error);
    });
});

/*  ===============
  Create Board
================ */
router.post("/:id/boards", (req, res, next) => {
  const { title, lists, users } = req.body;
  let userId = req.params.id;
  let board;
  Board.create({
    title,
    lists: [],
    users: [userId]
  })
    .then(result => {
      board = result;
      return User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { boards: board }
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({
        message: apiMessages.successfulPost,
        data: board
      });
    })
    .catch(error => next(error));
});

module.exports = router;
