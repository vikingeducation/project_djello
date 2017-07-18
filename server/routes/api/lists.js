const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;
const Board = models.Board;
const List = models.List;
const { checkUserBoardPermissions, apiMessages } = require("./../../helpers");

/*  ===============
  Create
================ */
router.post("/", (req, res, next) => {

});

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
  const listId = req.params.id;
  const {title, description} = req.body;

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

      return List.findByIdAndUpdate(listId, {
        title: title || list.title,
        description: description || list.description
      }, { new: true});
    })
    .then(result => {
      res.json({
        message: apiMessages.successfulPut,
        data: result
      })
    })
});

/*  ===============
  Add Card to List
================ */
router.post("/:id/card/:cardId", (req, res, next) => {

});

/*  ===============
  Remove Card from List
================ */
// router.delete("/:id/users/:userId", (req, res, next) => {
  
// });

module.exports = router;
