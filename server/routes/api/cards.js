const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;
const Board = models.Board;
const List = models.List;
const Card = models.Card;
const Activity = models.Activity;
const { 
  checkUserBoardPermissions,
  parseCardChange,
  apiMessages
} = require("./../../helpers");

/*  ===============
  Delete
================ */
router.delete("/:id", (req, res, next) => {
  const cardId = req.params.id;
  let deletedCard;

  Card.findById(cardId)
    .populate({
      path: "list",
      populate: {
        path: "board"
      }
    })
    .then(card => {
      if (!card) {
        throw new Error(apiMessages.doesNotExist("List"));
      }

      let canCurrentUserDelete = checkUserBoardPermissions(
        card.list.board,
        req.user.id
      );
      if (!canCurrentUserDelete) {
        throw new Error(apiMessages.failedAuth);
      }

      return Card.findByIdAndRemove(cardId);
    })
    .then(result => {
      deletedCard = result;
      return List.update({cards: {$in: [deletedCard.id]}}, {
        $pop: {cards: deletedCard}
      })
    })
    .then(() => {
      res.json({
        message: apiMessages.successfulDelete,
        data: {
          deletedResource: deletedCard
        }
      });
    })
    .catch(error => next(error));
});

/*  ===============
  Update Card
================ */
router.put("/:id", (req, res, next) => {
  const cardId = req.params.id;
  const { title, description } = req.body;
  let originalCard;

  Card.findById(cardId)
    .populate({
      path: "list",
      populate: {
        path: "board"
      }
    })
    .then(card => {
      if (!card) {
        throw new Error(apiMessages.doesNotExist("Card"));
      }

      let canCurrentUserDelete = checkUserBoardPermissions(
        card.list.board,
        req.user.id
      );
      if (!canCurrentUserDelete) {
        throw new Error(apiMessages.failedAuth);
      }
      originalCard = card;
      let activityMessage = parseCardChange(title, description);
      return Activity.create({
        description: activityMessage,
        card: cardId
      });
    })
    .then(activity => {
      return Card.findByIdAndUpdate(
        cardId,
        {
          title: title || originalCard.title,
          description: description || originalCard.description,
          $push: {activities: activity.id}
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({
        message: apiMessages.successfulPut,
        data: result
      });
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
      path: "list",
      populate: {
        path: "board"
      }
    })
    .then(card => {
      if (!card) {
        throw new Error(apiMessages.doesNotExist("Card"));
      }

      let canCurrentUserDelete = checkUserBoardPermissions(
        card.list.board,
        req.user.id
      );
      if (!canCurrentUserDelete) {
        throw new Error(apiMessages.failedAuth);
      }

      board = card.list.board;
      return Card.findByIdAndUpdate(
        cardId,
        {
          $addToSet: { members: userToAdd }
        },
        { new: true }
      );
    })
    .then(result => {
      updatedCard = result;
      return Board.findByIdAndUpdate(board.id, {
        $addToSet: { users: userToAdd }
      });
    })
    .then(result => {
      return User.findByIdAndUpdate(userToAdd, {
        $addToSet: { boards: board.id }
      });
    })
    .then(result => {
      res.json({
        message: apiMessages.successfulPut,
        data: updatedCard
      });
    })
    .catch(error => next(error));
});

module.exports = router;
