const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./config")(process.env.DB_URL);
const User = require("./models/User");
const { loginController } = require("./controllers/loginController");
const Board = require("./models/Board");
const List = require("./models/List");
const Card = require("./models/Card");
const formatUser = require("./services/formatUser");
const { USER_NOT_FOUND, WRONG_PASSWORD } = require("./services/constants");
const tokens = require("./tokens.json");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

app.set("port", process.env.PORT || 3001);

app.post("/api/login", async (req, res) => {
  const { username, password, token } = req.body;
  const user = await User.findOne({ username }).populate("boards");
  if (!user) return res.status(401).json({ error: USER_NOT_FOUND });
  user.validatePassword(password)
    ? res.json(formatUser(user, username))
    : res.status(401).json({ error: WRONG_PASSWORD });
});

app.post("/api/cards", async (req, res) => {
  console.log(req.body);
  const { description, list_id } = req.body;
  let card = new Card({
    description,
    list: list_id
  });
  card = await card.save();
  console.log(card);
  const updatedList = await List.update(
    { _id: list_id },
    { $push: { cards: card } }
  );
  console.log("updated list", updatedList);
  const list = await List.findById(list_id).populate("cards");
  console.log("returned list", list);
  res.json(list);
});

app.post("/api/lists", async (req, res) => {
  const { title, board_id } = req.body;
  let list = new List({
    title,
    board: board_id
  });
  list = await list.save();
  const updatedBoard = await Board.update(
    { _id: board_id },
    { $push: { lists: list } }
  );
  const board = await Board.findById(board_id).populate("lists");
  res.json(board);
});

app.post("/api/boards", async (req, res) => {
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

app.get("/api/boards/:id", async (req, res) => {
  const boardId = req.params.id;
  console.log(boardId);
  const board = await Board.findById(boardId).populate("lists");
  res.json(board);
});

app.get("/api/user", async (req, res) => {
  const token = req.headers.token;
  try {
    const user = await User.findOne({ token }).populate("boards");
    if (!user) return res.status(400).json({ error: "bad request" });
    res.json(formatUser(user));
  } catch (err) {
    res.status(400).json({ error: "bad request" });
  }
});

app.listen(app.get("port"), () => {
  console.log("listening on port 3001");
});
