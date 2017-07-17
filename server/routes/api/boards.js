const express = require("express");
const router = express.Router();
const models = require("./../../models");
const Board = models.Board;

router.post("/", (req, res, next) => {
  const { title, lists, users } = req.body;
  Board.create({
    title,
    lists,
    users
  })
    .then(board => {
      res.json({ data: board });
    })
    .catch(error => next(error));
});

router.delete("/:id", (req, res, next) => {
  const boardId = req.params.id;
  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error("Board does not exist");
      }
      let allUsers = board.users.map(user => user.toString());
      let canCurrentUserDelete = allUsers.includes(req.user.id);
      if (!canCurrentUserDelete) {
        throw new Error("You are not authorized to delete this resource");
      }

      return Board.findByIdAndRemove(boardId)
    })
    .then(result => {
      res.json({
        data: {
          message: "Resource successfully deleted.",
          deletedResource: result
        }
      });
    })
    .catch(error => next(error));
});

module.exports = router;
