const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;
const Board = models.Board;
const List = models.List;

/*  ===============
  Create
================ */
router.post("/", (req, res, next) => {

});

/*  ===============
  Delete
================ */
router.delete("/:id", (req, res, next) => {
  
});

/*  ===============
  Update List
================ */
router.put("/:id", (req, res, next) => {
  
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
