var express = require("express");
var router = express.Router();
var models = require("./../models");
var User = models.User;
var sequelize = models.sequelize;

// ----------------------------------------
// Create User
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
    .catch(e => res.send("error"));
});

// route test
//replace body parser URL encoded with this: app.use(bodyParser.json());
//curl -H "Content-Type: application/json" -d '{"firstName":"xyz", "lastName": "ddk", "email": "skjdflkjsd@gmail.welcome", "password":"xyz"}' http://localhost:3000/api/users

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
