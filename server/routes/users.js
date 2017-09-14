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
router.get("/:id", async (req, res) => {
  //get user from database
  console.log("getting request");
  const username = req.params.id;
  try {
    const user = await User.findOne({ username: req.params.id });
    //authenticate password
    // if (user.password === )
    console.log("server sees user as = ", user);
    res.json(user);
  } catch (e) {
    //handle error
    res.setStatus(404);
  } finally {
  }
});

module.exports = router;
