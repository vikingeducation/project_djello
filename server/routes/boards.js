//TODO: a get all boards api endpoint might be nifty
//maybe add some privacy settings, and some statistics as well to boards
const router = require("express").Router();
const { Board, User } = require("../models");
const { makeDefaultBoard } = require("../controllers");

router.get("/", (req, res) => {
  res.sendStatus(402);
});

router.post("/", async (req, res) => {
  //grab the user and the name
  try {
    const user = await User.findOne({ username: "a" });
    console.log("creating new board ");
    const name = req.body.name;
    console.log("name = ", req.body.name);
    const newBoard = await makeDefaultBoard(name);
    res.json(newBoard);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
