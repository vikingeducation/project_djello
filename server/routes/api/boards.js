const express = require("express");
const router = express.Router();
const models = require("./../../models");
const Board = models.Board;

router.post('/', (req, res, next) => {
  const {title, lists, users} = req.body;
  Board.create({
    title,
    lists,
    users
  })
    .then(board => {
      res.json({data: board});
    })
    .catch(error => next(error));
});

module.exports = router;