const express = require("express");
const router = express();
const List = require("../models/List");
const Board = require("../models/Board");

router.post("/", async (req, res) => {
  const { title, board_id } = req.body;
  console.log(req.body);
  let list = new List({
    title,
    board: board_id
  });
  list = await list.save();
  console.log(list);
  const updatedBoard = await Board.update(
    { _id: board_id },
    { $push: { lists: list } }
  );
  const board = await Board.findById(board_id).populate("lists lists.cards");
  res.json(board);
});

module.exports = router;
