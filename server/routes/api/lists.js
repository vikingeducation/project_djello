const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;
const Board = models.Board;
const List = models.List;
const Card = models.Card;
const { checkUserBoardPermissions, apiMessages } = require("./../../helpers");

/*  ===============
  Update List
================ */
router.put("/:id", (req, res, next) => {
  const listId = req.params.id;
  const { title, description } = req.body;

  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error(apiMessages.doesNotExist("List"));
      }

      let canCurrentUserDelete = checkUserBoardPermissions(
        list.board,
        req.user.id
      );
      if (!canCurrentUserDelete) {
        throw new Error(apiMessages.failedAuth);
      }

      return List.findByIdAndUpdate(
        listId,
        {
          title: title || list.title,
          description: description || list.description
        },
        { new: true }
      ).populate({
        path: "cards",
        populate: {
          path: "members"
        }
      });
    })
    .then(result => {
      res.json({
        message: apiMessages.successfulPut,
        data: result
      });
    });
});

/*  ===============
  Delete List
================ */
router.delete("/:id", (req, res, next) => {
  const listId = req.params.id;
  let deletedList;
  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error(apiMessages.doesNotExist("List"));
      }

      let canCurrentUserDelete = checkUserBoardPermissions(
        list.board,
        req.user.id
      );
      if (!canCurrentUserDelete) {
        throw new Error(apiMessages.failedAuth);
      }

      return List.findByIdAndRemove(listId);
    })
    .then(result => {
      deletedList = result;
      return Board.update(
        { lists: { $in: [deletedList.id] } },
        {
          $pop: { lists: deletedList }
        }
      );
    })
    .then(() => {
      res.json({
        message: apiMessages.successfulDelete,
        data: {
          deletedResource: deletedList
        }
      });
    })
    .catch(error => next(error));
});

/*  ===============
  Create Card
================ */
router.post("/:id/cards", (req, res, next) => {
  const listId = req.params.id;
  const { title, description } = req.body;
  let newCard;
  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error(apiMessages.doesNotExist("List"));
      }
      let canCurrentUserEdit = checkUserBoardPermissions(
        list.board,
        req.user.id
      );

      if (!canCurrentUserEdit) {
        throw new Error(apiMessages.failedAuth);
      }

      return Card.create({
        title: title || "New Card",
        description: description || "Enter a description here",
        list: listId,
        activities: [],
        members: [req.user.id]
      });
    })
    .then(result => {
      newCard = result;
      return List.findByIdAndUpdate(listId, {
        $addToSet: { cards: result.id }
      });
    })
    .then(() => Card.findById(newCard.id).populate("members"))
    .then(result => {
      res.json({
        message: apiMessages.successfulPost,
        data: result
      });
    })
    .catch(error => next(error));
});

module.exports = router;
