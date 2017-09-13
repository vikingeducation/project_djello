require("dotenv").config();
require("./config")(process.env.DB_URL);
require("./seeds/users")(10);

const express = require("express");
const server = express();
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));

server.set("port", process.env.PORT || 3001);

const usersRoutes = require("./routes/users");
server.use("/djello/api/users", usersRoutes);

const port = server.listen(server.get("port"), () => {
  console.log(`listening on ${server.get("port")}`);
});
