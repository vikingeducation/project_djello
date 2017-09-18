const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./config")(process.env.DB_URL);
const User = require("./models/User");
const { loginController } = require("./controllers/loginController");
const Board = require("./models/Board");
const formatUser = require("./services/formatUser");
const { USER_NOT_FOUND, WRONG_PASSWORD } = require("./services/constants");
const tokens = require("./tokens.json");

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
  console.log("getting here?");
  const boardId = req.params.id;
  const response = await Board.findById({ _id: boardId }).populate("lists");
  const populatedBoard = await response.json();
  res.json(populatedBoard);
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
