const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;
const Board = models.Board;
const List = models.List;
const Card = models.Card;
const { checkUserBoardPermissions, apiMessages } = require("./../../helpers");

/*  ===============
  Delete
================ */
router.delete("/:id", (req, res, next) => {
  const cardId = req.params.id;
  Card.findById(cardId)
    .populate({
      path: 'list',
      populate: {
        path: 'board'
      }
    })
    .then(card => {
      if (!card) {
        throw new Error(apiMessages.doesNotExist("List"));
      }

      let canCurrentUserDelete = checkUserBoardPermissions(card.list.board, req.user.id);
      if (!canCurrentUserDelete) {
        throw new Error(apiMessages.failedAuth);
      }

      return Card.findByIdAndRemove(cardId);
    })
    .then(result => {
      res.json({
        message: apiMessages.successfulDelete,
        data: {
          deletedResource: result
        }
      })
    })
    .catch(error => next(error));
});

/*  ===============
  Update List
================ */
router.put("/:id", (req, res, next) => {
  const cardId = req.params.id;
  const {title, description} = req.body;

  Card.findById(cardId)
    .populate({
      path: 'list',
      populate: {
        path: 'board'
      }
    })
    .then(card => {
      if (!card) {
        throw new Error(apiMessages.doesNotExist("Card"));
      }

      let canCurrentUserDelete = checkUserBoardPermissions(card.list.board, req.user.id);
      if (!canCurrentUserDelete) {
        throw new Error(apiMessages.failedAuth);
      }

      return Card.findByIdAndUpdate(cardId, {
        title: title || card.title,
        description: description || card.description
      }, { new: true});
    })
    .then(result => {
      res.json({
        message: apiMessages.successfulPut,
        data: result
      })
    })
    .catch(error => next(error));
});

/*  ===============
  Add Member to Card
================ */
router.post("/:id/users/:userId", (req, res, next) => {
  const cardId = req.params.id;
  const userToAdd = req.params.userId;
  let board;
  let updatedCard;

  Card.findById(cardId)
    .populate({
      path: 'list',
      populate: {
        path: 'board'
      }
    })
    .then(card => {
      if (!card) {
        throw new Error(apiMessages.doesNotExist("Card"));
      }

      let canCurrentUserDelete = checkUserBoardPermissions(card.list.board, req.user.id);
      if (!canCurrentUserDelete) {
        throw new Error(apiMessages.failedAuth);
      }

      board = card.list.board;
      return Card.findByIdAndUpdate(cardId, {
        $addToSet: {members: userToAdd}
      }, { new: true});
    })
    .then(result => {
      updatedCard = result;
      return Board.findByIdAndUpdate(board.id, {
        $addToSet: {users: userToAdd}
      });
    })
    .then(result => {
      return User.findByIdAndUpdate(userToAdd, {
        $addToSet: {boards: board.id}
      });
    })
    .then(result => {
      res.json({
        message: apiMessages.successfulPut,
        data: updatedCard
      })
    })
    .catch(error => next(error));
});

module.exports = router;
