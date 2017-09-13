const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

let testusers = ["fake1", "fake2"];

app.set("port", process.env.PORT || 3001);

app.post("/api/users", (req, res) => {
  console.log(req.body);
  res.json(testusers);
});

app.listen(app.get("port"), () => {
  console.log("listening on port 3001");
});
