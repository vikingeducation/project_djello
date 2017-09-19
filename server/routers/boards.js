const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const User = require("../models/User");

router.get("/:id", async (req, res) => {
  const boardId = req.params.id;
  try {
    const board = await Board.findById(boardId).populate("lists");
    if (!board) return res.status(400).json({ error: "no board found" });
    res.json(board);
  } catch (err) {
    res.status(400).json({ error: err.stack });
  }
});

router.post("/", async (req, res) => {
  const { title, username } = req.body;
  if (!req.headers.token || !username)
    return res.status(400).json({ error: "Please log in" });
  if (tokens[username] !== req.headers.token)
    return res.status(401).json({ error: "Don't mess with the token" });
  try {
    let board = new Board({ title });
    board = await board.save();
    const user = await User.update({ username }, { $push: { boards: board } });
    res.json(board);
  } catch (err) {
    res.status(400).json({ error: "unable to create" });
  }
});

module.exports = router;
