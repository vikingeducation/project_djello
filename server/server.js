const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./config")(process.env.DB_URL);
const User = require("./models/User");
const { loginController } = require("./controllers/loginController");
const boardsRouter = require("./routers/boards");
const listsRouter = require("./routers/lists");
const cardsRouter = require("./routers/cards");
const formatUser = require("./services/formatUser");
const { USER_NOT_FOUND, WRONG_PASSWORD } = require("./services/constants");
const tokens = require("./tokens.json");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

app.use("/api/boards", boardsRouter);
app.use("/api/lists", listsRouter);
app.use("/api/cards", cardsRouter);

app.set("port", process.env.PORT || 3001);

app.post("/api/login", async (req, res) => {
  const { username, password, token } = req.body;
  const user = await User.findOne({ username }).populate("boards");
  if (!user) return res.status(401).json({ error: USER_NOT_FOUND });
  user.validatePassword(password)
    ? res.json(formatUser(user, username))
    : res.status(401).json({ error: WRONG_PASSWORD });
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
