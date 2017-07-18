const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;
const usersRouter = require("./users");
const boardsRouter = require("./boards");
const listsRouter = require("./lists");
const jwtAuth = require("express-jwt");

router.use(
  jwtAuth({
    secret: process.env.JWT_SECRET
  })
);

router.use("/users", usersRouter);
router.use("/boards", boardsRouter);
router.use("/lists", listsRouter);

module.exports = router;
