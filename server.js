const express = require("express");
const app = express();
const {
  checkCookieRouter,
  loginRouter,
  signupRouter,
  tablesRouter,
  returnAllUsersRouter,
  newBoardRouter,
  newListRouter,
  newCardRouter,
  allBoardRouter,
  allListsOnBoardRouter,
  allCardsonListRouter,
  removeBoardRouter,
  removeListRouter,
  removeCardRouter,
  changeBoardRouter,
  changeListRouter,
  changeCardRouter,
  completeCardRouter
} = require("./routes");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ----------------------------------------
// Body Parser
// ----------------------------------------
var bodyParser = require("body-parser");
app.use(bodyParser.json({ extended: true }));

// ----------------------------------------
// Port
// ----------------------------------------
app.set("port", process.env.PORT || 3001);

// ----------------------------------------
// Static Files
// ----------------------------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// ----------------------------------------
// Routes
// ----------------------------------------
app.post("/login", loginRouter);

app.post("/signup", signupRouter);

app.post("/cookie", checkCookieRouter);

app.post("/newBoard", newBoardRouter);

app.post("/newList", newListRouter);

app.post("/newCard", newCardRouter);

app.get("/boards", allBoardRouter);

app.get("/lists/:boardname", allListsOnBoardRouter);

app.get("/cards/:listname/:username", allCardsonListRouter);

app.get("/users", returnAllUsersRouter);

app.post("/change/board", changeBoardRouter);
app.post("/change/list", changeListRouter);
app.post("/change/card", changeCardRouter);

app.post("/complete/card", completeCardRouter);

app.get("/remove/card/:cardName", removeCardRouter);

app.get("/remove/list/:listName", removeListRouter);

app.get("/remove/board/:boardName", removeBoardRouter);

app.get("*", (req, res, next) => {
  console.log("Called");
  res.send("Ok");
});

// function errorHandler(err, req, res, next) {
//   console.error(`Api Error: ${err.stack}`);
//   res.status(err.response ? err.response.status : 500);
//   res.json({ error: err.message });
// }
//
// app.use(errorHandler);

// ----------------------------------------
// App Listen
// ----------------------------------------
app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}/`);
});
