const express = require("express");
const app = express();
const {
  checkCookieRouter,
  loginRouter,
  signupRouter,
  tablesRouter
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

app.get("/tables", tablesRouter);

app.get("*", (req, res, next) => {
  console.log("Called");
  res.send("Ok");
});

function errorHandler(err, req, res, next) {
  console.error(`Api Error: ${err.stack}`);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
}

app.use(errorHandler);

// ----------------------------------------
// App Listen
// ----------------------------------------
app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}/`);
});
