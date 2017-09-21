const router = require("express").Router();
const { User } = require("../models");
const { getFullUserData } = require("../controllers");

/* GET users listing. */
router.get("/", (req, res, next) => {
  User.find()
    .then(users => {
      return res.json(users);
    })
    .catch(err => {
      next(err);
    });
});

//GET A USER
router.get("/:id", async (req, res) => {
  console.log("getting request");
  const username = req.params.id;
  try {
    const user = await getFullUserData({ username: username });
    if (!user) {
      return res.sendStatus(404);
    }
    // if (user.password === )
    res.json(user);
  } catch (e) {
    //handle error
    return res.sendStatus(500);
  }
});

//CREATE A USER
router.post("/:id", async (req, res) => {
  const username = req.params.id;
  try {
    //TODO: //attempt authentication
    let { username, password } = req.body;
    const user = await getFullUserData({ username: username });
    if (!user) {
      return res.sendStatus(404);
    } else if (!user.validatePassword(password)) {
      return res.sendStatus(400);
    }
    console.log("user = ", user);
    console.log("server sees user as = ", user);
    res.json(user);
  } catch (e) {
    //handle error
    return res.sendStatus(500);
  }
});

module.exports = router;
