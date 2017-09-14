const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressSession = require("express-session");
require("dotenv").config();
const db = require("./config")(process.env.DB_URL);
const User = require("./models/User");
const formatUser = require("./services/formatUser");
const { createSignedSessionId } = require("./services/session");

app.use(bodyParser.json());

app.set("port", process.env.PORT || 3001);

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user)
    return res
      .status(401)
      .json({ error: "We did not find your username in the database" });
  if (user.validatePassword) {
    res.cookie(createSignedSessionId(username));
    res.json(formatUser(user));
  } else {
    res.status(401).json({ error: "Your password was incorrect" });
  }
});

app.listen(app.get("port"), () => {
  console.log("listening on port 3001");
});
