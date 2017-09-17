const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./config")(process.env.DB_URL);
const User = require("./models/User");
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

app.post("/api/boards/new", async (req, res) => {
  console.log(req.headers.token);
  const { title, username } = req.body;
  if (!req.headers.token || !username)
    return res.status(400).json({ error: "You're not doing this right" });
  if (tokens[username] !== req.headers.token)
    return res.status(401).json({ error: "Don't mess with the token" });
  let board = new Board({
    title
  });
  board = await board.save();
  console.log("here");

  // const user = await User.findOne({ username });
  // await user.update({ $push: { boards: board } });
  const user = await User.update({ username }, { $push: { boards: board } });
  console.log(user.boards);
  res.json(board);
  //   if (!user) return res.status(401).json({ error: USER_NOT_FOUND });
  //   user.validatePassword(password)
  //     ? res.json(formatUser(user, username))
  //     : res.status(401).json({ error: WRONG_PASSWORD });
});

app.get("/api/user", async (req, res) => {
  const token = req.headers.token;
  const user = await User.findOne({ token }).populate("boards");
  console.log(user);
  res.json(formatUser(user));
});

app.listen(app.get("port"), () => {
  console.log("listening on port 3001");
});
