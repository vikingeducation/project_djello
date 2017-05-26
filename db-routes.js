const express = require("express");
const models = require("./models");
const User = models.User;
const Board = models.Board;
const sequelize = models.sequelize;
const app = (module.exports = express.Router());

app.get("/boards/:userId", (req, res) => {
  Board.findAll({
    where: { ownerId: req.params.userId },
    include: [{ all: true, include: [{ all: true }] }]
  }).then(boards => {
    res.send({ boards });
  });
});

app.post("/boards/new", (req, res) => {
  console.log("REQ", req.body);
  Board.create({
    name: req.body.name,
    ownerId: +req.body.ownerId
  })
    .then(board => {
      res.send({ board });
    })
    .catch(function(err) {
      console.log(err, req.body);
    });
});
