const bcrypt = require("bcrypt");
const models = require("./models");
const User = models.User;
const Board = models.Board;
const Card = models.Card;
const List = models.List;
const sequelize = models.sequelize;
const Op = require("sequelize").Op;
const secret = process.env["SECRET"] || "lavalamp";
const md5 = require("md5");
//–––––––––––––––––––––––––
//Password
//–––––––––––––––––––––––––
const validatePassword = function(hashedPassword, password) {
  return bcrypt.compareSync(password, hashedPassword);
};

const setPassword = function(value) {
  return bcrypt.hashSync(value, 8);
};

//–––––––––––––––––––––––––
//Signature
//–––––––––––––––––––––––––
const generateSignature = function(username) {
  return md5(username + secret);
};

const createSignedSessionId = function(username) {
  return `${username}:${generateSignature(username)}`;
};

const checkCookieRouter = function(req, res) {
  if (req.body.signature) {
    const [username, signature] = req.body.signature.split(":");
    User.findOne({ where: { username: username } })
      .then(user => {
        if (signature === generateSignature(user.username)) {
          res.status(200).send({ data: { match: true } });
        } else {
          res.status(200).send({ data: { match: false } });
        }
      })
      .catch(e => res.status(500).send(e.stack));
  } else {
    res.status(200).send({ data: { match: false } });
  }
};

//–––––––––––––––––––––––––
//Login Router
//–––––––––––––––––––––––––
const loginRouter = function(req, res) {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (user && validatePassword(user.passwordHash, req.body.password)) {
        console.log("User Found!!!!");
        res
          .status(200)
          .send({ data: createSignedSessionId(req.body.username) });
      } else {
        console.log("No User Found!!!");
        res.status(404).send({ Error: "User Not Found" });
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

//–––––––––––––––––––––––––
//Signup Router
//–––––––––––––––––––––––––
const signupRouter = function(req, res) {
  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (user) {
        res.status(400).send({ Error: "Unique Name Needed" });
      } else {
        const hPass = setPassword(req.body.password);
        const createParams = {
          username: req.body.username,
          passwordHash: hPass
        };
        User.create(createParams)
          .then(user => {
            console.log("User created!!!!");
            res
              .status(200)
              .send({ data: createSignedSessionId(req.body.username) });
          })
          .catch(e => res.status(500).send(e.stack));
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

//–––––––––––––––––––––––––
//Return Alls
//–––––––––––––––––––––––––
const returnAllUsersRouter = function(req, res) {
  User.findAll({ attributes: ["username"] })
    .then(users => {
      res.status(200).send({ data: users });
    })
    .catch(e => res.status(500).send(e.stack));
};

const allBoardRouter = function(req, res) {
  Board.findAll({})
    .then(boards => {
      res.status(200).send({ data: boards });
    })
    .catch(e => res.status(500).send(e.stack));
};
const allListsOnBoardRouter = function(req, res) {
  Board.findOne({ where: { title: req.params.boardname } }).then(board => {
    List.findAll({ where: { boardid: board.id } })
      .then(lists => {
        res.status(200).send({ data: lists });
      })
      .catch(e => res.status(500).send(e.stack));
  });
};

const allCardsonListRouter = function(req, res) {
  List.findOne({ where: { title: req.params.listname } }).then(list => {
    User.findOne({ where: { username: req.params.username } }).then(user => {
      User.findAll().then(allUser => {
        Card.findAll({
          where: {
            listid: list.id,
            members: {
              [Op.contains]: [user.id]
            }
          }
        })
          .then(cards => {
            if (cards) {
              //set userid to usernames
              for (var i = 0; i < cards.length; i++) {
                for (var j = 0; j < cards[i].members.length; j++) {
                  for (var k = 0; k < allUser.length; k++) {
                    if (allUser[k].id === cards[i].members[j]) {
                      cards[i].members[j] = allUser[k].username;
                    }
                  }
                }
              }

              res.status(200).send({ data: cards });
            } else {
              console.log("No User Found!!!");
              res.status(404).send({ Error: "Cards Not Found" });
            }
          })
          .catch(e => res.status(500).send(e.stack));
      });
    });
  });
};

//–––––––––––––––––––––––––
//New Tasks
//–––––––––––––––––––––––––
const newBoardRouter = function(req, res) {
  Board.findOne({ where: { title: req.body.title } })
    .then(board => {
      if (board) {
        res.status(400).send({ Error: "Unique Name Needed" });
      } else {
        const createParams = {
          title: req.body.title
        };
        Board.create(createParams)
          .then(board => {
            console.log("Board created!!!!");
            res.status(200).send({ data: board });
          })
          .catch(e => res.status(500).send(e.stack));
      }
    })
    .catch(e => res.status(500).send(e.stack));
};
const newListRouter = function(req, res) {
  Board.findOne({ where: { title: req.body.boardname } }).then(board => {
    List.findOne({ where: { title: req.body.title } })
      .then(list => {
        if (list) {
          res.status(400).send({ Error: "Unique Name Needed" });
        } else {
          const createParams = {
            title: req.body.title,
            description: req.body.description,
            activity: req.body.activity,
            boardid: board.id
          };
          List.create(createParams)
            .then(list => {
              console.log("List created!!!!");
              res.status(200).send({ data: list });
            })
            .catch(e => res.status(500).send(e.stack));
        }
      })
      .catch(e => {
        res.status(500).send(e.stack);
      });
  });
};

const newCardRouter = function(req, res) {
  List.findOne({ where: { title: req.body.listTitle } }).then(list => {
    Card.findOne({ where: { title: req.body.title } })
      .then(card => {
        if (card) {
          res.status(400).send({ Error: "Unique Name Needed" });
        } else {
          User.findAll({
            where: {
              username: {
                [Op.or]: req.body.members
              }
            },
            attributes: ["id"]
          })
            .then(users => {
              let userArray = [];
              for (var i = 0; i < users.length; i++) {
                userArray.push(users[i].dataValues.id);
              }

              const createParams = {
                title: req.body.title,
                description: req.body.description,
                listid: list.id,
                complete: false,
                members: userArray,
                activity: [""]
              };
              Card.create(createParams)
                .then(card => {
                  User.findAll().then(allUser => {
                    //set userid to usernames
                    for (var j = 0; j < card.members.length; j++) {
                      for (var k = 0; k < allUser.length; k++) {
                        if (allUser[k].id === card.members[j]) {
                          card.members[j] = allUser[k].username;
                        }
                      }
                    }

                    console.log("Card created!!!!");
                    res.status(200).send({ data: card });
                  });
                })
                .catch(e => {
                  res.status(500).send(e.stack);
                });
            })
            .catch(e => res.status(500).send(e.stack));
        }
      })
      .catch(e => {
        res.status(500).send(e.stack);
      });
  });
};

//–––––––––––––––––––––––––
//Remove Routers
//–––––––––––––––––––––––––
const removeBoardRouter = function(req, res) {
  Board.findOne({ where: { title: req.params.boardName } })
    .then(board => {
      return board.destroy();
    })
    .then(() => {
      res.status(200).send("Good");
    })
    .catch(e => res.status(500).send(e.stack));
};

const removeListRouter = function(req, res) {
  List.findOne({ where: { title: req.params.listName } })
    .then(list => {
      return list.destroy();
    })
    .then(() => {
      res.status(200).send("Good");
    })
    .catch(e => res.status(500).send(e.stack));
};

const removeCardRouter = function(req, res) {
  Card.findOne({ where: { title: req.params.cardName } })
    .then(card => {
      return card.destroy();
    })
    .then(() => {
      res.status(200).send("Good");
    })
    .catch(e => res.status(500).send(e.stack));
};

//–––––––––––––––––––––––––
//Tables Router
//–––––––––––––––––––––––––
const tablesRouter = function(req, res) {
  //return data for tables
  User.findAll().then(users => {
    console.log(users);
  });
  res.send("Tables ok");
};

module.exports = {
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
  removeCardRouter
};
