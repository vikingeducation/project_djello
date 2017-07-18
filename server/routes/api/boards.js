const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;
const Board = models.Board;
const { checkUserBoardPermissions } = require("./../../helpers");

/*  ===============
  Create
================ */
router.post("/", (req, res, next) => {
  const { title, lists, users } = req.body;
  let board;
  Board.create({
    title,
    lists,
    users
  })
    .then(result => {
      board = result;
      return User.findByIdAndUpdate(
        req.user.id,
        {
          $addToSet: { boards: board }
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({ data: board });
    })
    .catch(error => next(error));
});

/*  ===============
  Delete
================ */
router.delete("/:id", (req, res, next) => {
  const boardId = req.params.id;
  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error("Board does not exist");
      }
      let canCurrentUserDelete = checkUserBoardPermissions(board, req.user.id);
      if (!canCurrentUserDelete) {
        throw new Error("You are not authorized to delete this resource.");
      }

      return Board.findByIdAndRemove(boardId);
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

/*  ===============
  Update Board
================ */
router.put("/:id", (req, res, next) => {
  const boardId = req.params.id;
  let newTitle = req.body.title;

  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error("Board does not exist");
      }

      let canCurrentUserEdit = checkUserBoardPermissions(board, req.user.id);
      if (!canCurrentUserEdit) {
        throw new Error("You are not authorized to modify this resource.");
      }

      // Add the user to the board's array
      return Board.findByIdAndUpdate(
        boardId,
        {
          title: newTitle
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({
        message: "Resource successfully updated.",
        data: result
      });
    })
    .catch(error => next(error));
});

/*  ===============
  Add User to Board
================ */
router.post("/:id/users/:userId", (req, res, next) => {
  const boardId = req.params.id;
  const userToAdd = req.params.userId;
  let updatedBoard;

  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error("Board does not exist");
      }
      let canCurrentUserEdit = checkUserBoardPermissions(board, req.user.id);

      if (!canCurrentUserEdit) {
        throw new Error("You are not authorized to modify this resource.");
      }

      // Add the user to the board's array
      return Board.findByIdAndUpdate(
        boardId,
        {
          $addToSet: { users: userToAdd }
        },
        { new: true }
      );
    })
    .then(result => {
      updatedBoard = result;

      // Then update corresponding user
      return User.findByIdAndUpdate(
        userToAdd,
        {
          $addToSet: { boards: updatedBoard }
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({
        message: "Resource successfully updated.",
        data: {
          board: updatedBoard,
          user: result
        }
      });
    })
    .catch(error => next(error));
});

/*  ===============
  Remove User from Board
================ */
router.delete("/:id/users/:userId", (req, res, next) => {
  const boardId = req.params.id;
  const userToRemove = req.params.userId;
  let updatedBoard;

  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error("Board does not exist");
      }
      let canCurrentUserEdit = checkUserBoardPermissions(board, req.user.id);

      if (!canCurrentUserEdit) {
        throw new Error("You are not authorized to modify this resource.");
      }

      // Remove the user from the board's array
      return Board.findByIdAndUpdate(
        boardId,
        {
          $pop: { users: userToRemove }
        },
        { new: true }
      );
    })
    .then(result => {
      updatedBoard = result;

      // Then remove the board from the user's array
      return User.findByIdAndUpdate(
        userToRemove,
        {
          $pop: { boards: updatedBoard }
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({
        message: "Resource successfully updated.",
        data: {
          board: updatedBoard,
          user: result
        }
      });
    })
    .catch(error => next(error));
});

module.exports = router;
