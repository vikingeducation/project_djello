const express = require("express");
const app = express();
const { loginRouter, signupRouter, tablesRouter } = require("./routes");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res, next) => {
  console.log("Called");
  res.send("Ok");
});

app.post("/login", loginRouter);

app.post("/signup", signupRouter);

app.get("/tables", tablesRouter);

function errorHandler(err, req, res, next) {
  console.error(`Api Error: ${err.stack}`);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
}

app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}/`);
});
