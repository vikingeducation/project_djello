const express = require("express");
const models = require("./models");
const User = models.User;
const Board = models.Board;
const UsersBoards = models.UsersBoards;
const UsersCards = models.UsersCards;
const List = models.List;
const Card = models.Card;
const Activity = models.Activity;
const sequelize = models.sequelize;
const app = (module.exports = express.Router());

app.get("/boards/:userId", (req, res) => {
  Board.findAll({
    include: [
      {
        model: UsersBoards,

        where: {
          userId: req.params.userId
        }
      },

      { model: User, as: "Owner", attributes: ["email"] },
      {
        model: List,
        include: [
          {
            model: Card,
            include: [
              {
                model: Activity,
                include: [{ model: User, as: "Author", attributes: ["email"] }]
              },
              {
                model: UsersCards,
                include: [
                  { model: User, as: "MemberOfCard", attributes: ["email"] }
                ]
              }
            ]
          }
        ]
      }
    ],
    order: [["name"], [List, "createdAt"]]
  })
    .then(boards => {
      res.send({ boards });
    })
    .catch(function(err) {
      console.log(err, req.body);
    });
});

app.post("/boards/new", (req, res) => {
  let currBoard;
  Board.create({
    name: req.body.name,
    ownerId: +req.body.ownerId
  })
    .then(board => {
      currBoard = board;
      UsersBoards.create({
        userId: currBoard.ownerId,
        boardId: currBoard.id
      }).then(board => {
        console.log("CURR", currBoard);
        res.send({ boardId: currBoard.id });
      });
    })
    .catch(function(err) {
      console.log(err, req.body);
    });
});

app.delete("/boards/delete/:boardId", (req, res) => {
  Board.destroy({ where: { id: +req.params.boardId }, limit: 1 })
    .then(() => res.send({ boardId: req.params.boardId }))
    .catch(function(err) {
      console.log(err, req.body);
    });
});

app.post("/lists/new", (req, res) => {
  List.create({
    title: req.body.title,
    boardId: +req.body.boardId,
    description: req.body.description
  })
    .then(list => {
      res.send({ list });
    })
    .catch(function(err) {
      console.log(err, req.body);
    });
});

app.delete("/lists/delete/:listId", (req, res) => {
  List.destroy({ where: { id: +req.params.listId }, limit: 1 })
    .then(() => res.send({}))
    .catch(function(err) {
      console.log(err, req.body);
    });
});

app.put("/lists/update/:listId", (req, res) => {
  List.update(
    { title: req.body.title, description: req.body.description },
    { where: { id: +req.params.listId }, limit: 1 }
  )
    .then(list => {
      res.send({});
    })
    .catch(function(err) {
      console.log(err, req.body);
    });
});
