const express = require("express");
const router = express.Router();
const models = require("./../models");
const User = models.User;
const jwt = require('jsonwebtoken');

// router.get("/", (req, res) => {
//   User.findOne()
//     .then(user => {
//       console.log(user);
//       console.log(user.validatePassword('password'));
//       // if (!user) {
//         // throw new Error("User could not be found");
//       // }

//       console.log(process.env.JWT_SECRET);
//       let token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
//       res.json({token});
//     })
//     .catch(error => {
//       res.json({error});
//     });
// });

router.post("/", (req, res) => {
  let {email, password} = req.body;
  User.findOne({email})
    .then(user => {
      if (!user) {
        throw new Error("User could not be found");
      }

      let isPasswordValid = user.validatePassword(password);
      console.log(process.env.JWT_SECRET);
      if (!isPasswordValid) {
        throw new Error("Could not authenticate user");
      }

      let token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
      res.json({token});
    })
    .catch(error => {
      res.json({error});
    });
});

module.exports = router;