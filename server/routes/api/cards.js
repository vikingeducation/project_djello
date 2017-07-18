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
  const listId = req.params.id;
  List.findById(listId)
    .populate('board')
    .then(list => {
      if (!list) {
        throw new Error(apiMessages.doesNotExist("List"));
      }

      let canCurrentUserDelete = checkUserBoardPermissions(list.board, req.user.id);
      if (!canCurrentUserDelete) {
        throw new Error(apiMessages.failedAuth);
      }

      return List.findByIdAndRemove(listId);
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
});

module.exports = router;
