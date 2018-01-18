var express = require("express");
var router = express.Router();
var models = require("./../models");
var { User, Board, Card, List } = models;
var sequelize = models.sequelize;

router.post("/login", function(req, res, next) {
  User.findOne({
    where: { email: req.body.email, password: req.body.password },
    include: [Board] //[{model: Board}]
  })
    .then(result => {
      res.json(result);
    }) //res.json()
    .catch(e => next(e));
});

// ----------------------------------------
// Index
// ----------------------------------------
router.get("/users", function(req, res, next) {
  User.findAll({
    include: [Board]
  })
    .then(result => {
      res.json(result);
    })
    .catch(e => next(e));
});

// router.get("/boards", function(req, res, next) {
//   User.findAll({
//     include: [Board]
//   })
//     .then(result => {
//       res.json(result);
//     })
//     .catch(e => next(e));
// });

// ----------------------------------------
// Show
// ----------------------------------------
router.get("/users/:id", function(req, res, next) {
  User.findOne({
    where: { id: req.params.id },
    include: Board //[{model: Board}]
  })
    .then(result => {
      res.json(result);
    })
    .catch(e => next(e));
});

router.get("/boards/:id", function(req, res, next) {
  Board.findOne({
    where: { id: req.params.id },
    include: List //[{model: Board}]
  })
    .then(result => {
      res.json(result);
    })
    .catch(e => next(e));
});

// router.get("/lists/:id", function(req, res, next) {
//   List.findOne({
//     where: { id: req.params.id }
//     //include: Board //[{model: Board}]
//   })
//     .then(result => {
//       res.json(result);
//     })
//     .catch(e => next(e));
// });

// ----------------------------------------
// Create User/Sign up
// ----------------------------------------
router.post("/users", (req, res) => {
  console.log("req =>", req.body);
  let body = req.body;
  var userParams = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password
  };

  User.create(userParams)
    .then(user => {
      res.json(user);
    })
    .catch(e => next(e));
});
//curl -H "Content-Type: application/json" -d '{"firstName":"xyz", "lastName": "ddk", "email": "skjdflkjsd@gmail.welcome", "password":"xyz"}' http://localhost:3000/api/users

// ----------------------------------------
// Create Board
// ----------------------------------------
router.post("/boards/new", async (req, res) => {
  try {
    let body = req.body;
    let boardName = body.boardName;
    const id = body.id;

    await Board.create({ name: boardName, userId: id });

    let results = await User.findOne({
      where: { id: body.id },
      include: Board //[{model: Board}]
    });

    res.json(results);
  } catch (e) {
    next(e);
  }
});
//curl -H 'Content-Type: application/json' -d '{"boardName":"xyz","userId":"1"}' http://localhost:3000/api/users/10/newboard

// ----------------------------------------
// Create List
// ----------------------------------------
router.post("/lists", async (req, res) => {
  try {
    let body = req.body;
    let id = body.id;
    let listName = body.listName;
    let list = await List.create({ name: listName, boardId: id });

    res.json(list);
  } catch (e) {
    next(e);
  }
});
//curl -H 'Content-Type: application/json' -d '{"listName":"xyz"}' http://localhost:3000/api/board/1/newlist

// ----------------------------------------
// Create Cards
// ----------------------------------------
router.post("/cards", async (req, res) => {
  try {
    let body = req.body;
    let cardName = body.cardName;
    let cardBody = body.cardBody;
    const id = body.id;

    let card = await Card.create({
      name: cardName,
      listId: id,
      body: cardBody
    });

    res.json(card);
  } catch (e) {
    next(e);
  }
});
//curl -H 'Content-Type: application/json' -d '{"cardName":"xyz", "cardBody": "kjsldkfjsdljfsdlkfj"}' http://localhost:3000/api/list/1/newCard

// route test
//replace body parser URL encoded with this: app.use(bodyParser.json());

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete("/boards/:id", (req, res) => {
  Board.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(result => {
      res.send();
    }) //res.send() is shorthand
    .catch(e => {
      next(e);
    });
});

// ----------------------------------------
// Index
// ----------------------------------------
// var onIndex = (req, res) => {
//   User.findAll()
//     .then(users => {
//       res.render("users/index", { users });
//     })
//     .catch(e => res.status(500).send(e.stack));
// };
// router.get("/", onIndex);
// router.get("/users", onIndex);

// ----------------------------------------
// New
// ----------------------------------------
// router.get("/users/new", (req, res) => {
//   res.render("users/new");
// });

// ----------------------------------------
// Edit
// ----------------------------------------
// router.get("/users/:id/edit", (req, res) => {
//   User.findById(req.params.id)
//     .then(user => {
//       if (user) {
//         res.render("users/edit", {user});
//       } else {
//         res.send(404);
//       }
//     })
//     .catch(e => res.status(500).send(e.stack));
// });

// ----------------------------------------
// Show
// ----------------------------------------
// router.get("/users/:id", (req, res) => {
//   User.findById(req.params.id)
//     .then(user => {
//       if (user) {
//         res.render("users/show", {user});
//       } else {
//         res.send(404);
//       }
//     })
//     .catch(e => res.status(500).send(e.stack));
// });

// ----------------------------------------
// Update
// ----------------------------------------
// router.put("/users/:id", (req, res) => {
//   var userParams = req.body.user;
//
//   User.update(
//     {
//       fname: userParams.fname,
//       lname: userParams.lname,
//       username: userParams.username,
//       email: userParams.email
//     },
//     {
//       where: {id: req.params.id},
//       limit: 1
//     }
//   )
//     .then(() => {
//       req.method = "GET";
//       res.redirect(`/users/${req.params.id}`);
//     })
//     .catch(e => res.status(500).send(e.stack));
// });

// ----------------------------------------
// Destroy
// ----------------------------------------
// router.delete("/users/:id", (req, res) => {
//   User.destroy({
//     where: {id: req.params.id},
//     limit: 1
//   })
//     .then(() => {
//       req.method = "GET";
//       res.redirect("/users");
//     })
//     .catch(e => res.status(500).send(e.stack));
// });

module.exports = router;
