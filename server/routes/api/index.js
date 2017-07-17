const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;
const usersRouter = require("./users");
const boardsRouter = require("./boards");
const jwtAuth = require("express-jwt");

router.use(
  jwtAuth({
    secret: process.env.JWT_SECRET
  })
);

router.use("/users", usersRouter);
router.use("/boards", boardsRouter);

module.exports = router;
