const router = require("express").Router();
const { User } = require("../models");

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
const getFullUserData = async query => {
  const user = await User.findOne({ username: "a" }).populate({
    path: "boards",
    populate: {
      path: "lists",
      populate: {
        path: "cards"
      }
    }
  });
  return user;
};
router.post("/:id", async (req, res) => {
  const username = req.params.id;
  console.log("body = ", req.body);
  // return res.sendStatus("200");
  try {
    //TODO: //attempt authentication
    let { username, password } = req.body;
    const user = await getFullUserData({ username: username });
    if (!user) {
      return res.sendStatus(404);
    } else if (user.password !== password) {
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
router.get("/:id", async (req, res) => {
  //get user from database
  console.log("getting request");
  const username = req.params.id;
  console.log("username = ", username);
  try {
    //make sure to populate all their data
    // const user = await User.findOne({ username: req.params.id });
    //
    // const user = await User.findOne({ username: req.params.id })
    //   .populate("boards")
    //   .populate("lists")
    //   .populate("cards");
    const user = await getFullUserData({ username: username });
    if (!user) {
      return res.sendStatus(404);
    }
    console.log("user = ", user);
    //authenticate password
    // if (user.password === )
    console.log("server sees user as = ", user);
    res.json(user);
  } catch (e) {
    //handle error
    return res.sendStatus(500);
  }
});

module.exports = router;
