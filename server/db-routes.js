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

app.get("/boards/:userId", (req, res, next) => {
  Board.findAll({
    include: [
      {
        model: UsersBoards,
        where: {
          userId: req.params.userId
        },

        include: { model: User, attributes: ["email"] }
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
                include: [{ model: User, attributes: ["email"] }]
              }
            ]
          }
        ]
      }
    ],
    order: [
      ["name"],
      [List, "createdAt"],
      [List, Card, "createdAt"],
      [List, Card, Activity, "createdAt", "DESC"]
    ]
  })
    .then(boards => {
      res.send({ boards });
    })
    .catch(next);
});

app.post("/boards/new", (req, res, next) => {
  let currBoard;
  Board.create({
    name: req.body.name,
    ownerId: +req.body.ownerId
  })
    .then(board => {
      currBoard = board;
      UsersBoards.create({
        fixId: +new Date(),
        userId: currBoard.ownerId,
        boardId: currBoard.id
      }).then(board => {
        res.send({ boardId: currBoard.id });
      });
    })
    .catch(next);
});

app.delete("/boards/delete/:boardId", (req, res, next) => {
  Board.destroy({ where: { id: +req.params.boardId }, limit: 1 })
    .then(() => res.send({ boardId: req.params.boardId }))
    .catch(next);
});

app.post("/lists/new", (req, res, next) => {
  List.create({
    title: req.body.title,
    boardId: +req.body.boardId,
    description: req.body.description === "undefined"
      ? ""
      : req.body.description
  })
    .then(list => {
      res.send({ list });
    })
    .catch(next);
});

app.delete("/lists/delete/:listId", (req, res, next) => {
  List.destroy({ where: { id: +req.params.listId }, limit: 1 })
    .then(() => res.send({}))
    .catch(next);
});

app.put("/lists/update/:listId", (req, res, next) => {
  List.update(
    { title: req.body.title, description: req.body.description },
    { where: { id: +req.params.listId }, limit: 1 }
  )
    .then(list => {
      res.send({});
    })
    .catch(next);
});

app.post("/cards/new", (req, res, next) => {
  Card.create({
    title: req.body.title,
    description: req.body.description,
    listId: req.body.listId
  })
    .then(card => {
      Activity.create({
        authorId: req.user.id,
        cardId: card.id,
        description: `created this card`
      });
    })
    .then(() => {
      res.send({});
    })
    .catch(next);
});

app.put("/cards/update/:cardId", (req, res, next) => {
  Card.update(
    { title: req.body.title, description: req.body.description },
    { where: { id: +req.params.cardId }, limit: 1 }
  )
    .then(card => {
      Activity.create({
        authorId: req.user.id,
        cardId: +req.params.cardId,
        description: req.body.name === "title"
          ? `changed title of this card to "${req.body.title}"`
          : `changed description of this card to "${req.body.description}"`
      });
    })
    .then(() => {
      res.send({});
    })
    .catch(next);
});

app.delete("/cards/delete/:cardId", (req, res, next) => {
  Card.destroy({ where: { id: +req.params.cardId }, limit: 1 })
    .then(() => res.send({}))
    .catch(next);
});

app.get("/users", (req, res, next) => {
  User.findAll({ attributes: ["email"] })
    .then(users => {
      users = users.map(user => user.email);
      res.send({ users });
    })
    .catch(next);
});

app.post("/cards/member/add/:cardId", (req, res, next) => {
  let userId;
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      userId = user.id;
      UsersCards.create({
        fixId: +new Date(),
        memberId: userId,
        cardId: +req.params.cardId
      }).then(() => {
        UsersBoards.findOne({
          where: { userId: userId, boardId: +req.body.boardId }
        })
          .then(usersboard => {
            if (!usersboard) {
              UsersBoards.create({
                fixId: +new Date(),
                userId: userId,
                boardId: +req.body.boardId
              });
            }
          })
          .then(() => {
            Activity.create({
              authorId: req.user.id,
              cardId: +req.params.cardId,
              description: `added ${req.body.email} to members' list `
            });
          })
          .then(() => {
            res.send({});
          });
      });
    })
    .catch(next);
});

app.delete("/cards/member/delete/:cardId", (req, res, next) => {
  User.findOne({ where: { email: req.body.email } }).then(user => {
    UsersCards.destroy({
      where: { memberId: user.id, cardId: +req.params.cardId },
      limit: 1
    })
      .then(() => {
        Activity.create({
          authorId: req.user.id,
          cardId: +req.params.cardId,
          description: `removed ${req.body.email} from members' list `
        });
      })
      .then(() => res.send({}))
      .catch(next);
  });
});

// app.get("/test", (req, res) => {
//   Card.findAll({
//     where: { listId: [1, 2] },
//     include: [
//       { model: UsersCards, include: [{ model: User, attributes: ["email"] }] }
//     ]
//   }).then(cards => {
//     res.send({ cards });
//   });
// });
