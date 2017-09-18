//TODO: a get all boards api endpoint might be nifty
//maybe add some privacy settings, and some statistics as well to boards
const router = require("express").Router();
const { Board, User } = require("../models");
const { makeDefaultBoard, getFullUserData } = require("../controllers");

//boards for user 'a' = /boards?user=a
router.get("/", async (req, res) => {
  //TODO: implement user tokens
  //grab the token
  let user;
  const userId = req.query.user;
  try {
    user = await getFullUserData({ username: userId });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  if (!user) return res.sendStatus(404);

  return res.json(user.boards);
});
router.delete(`/:id`, async (req, res) => {
  console.log("deleting");
  let boardId = req.params.id;
  const userId = req.query.user;
  let selectedBoard;
  try {
    user = await getFullUserData({ username: userId });

    if (!user) return res.sendStatus(404);

    //delete the board
    await Board.remove({ _id: boardId });
    //remove the reference from user
    user.boards = user.boards.filter(board => {
      return !(boardId == board._id);
    });

    await user.save();
    // await User.find().then(console.log);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  res.end(true);
});

router.post("/", async (req, res) => {
  //grab the user and the name
  try {
    const user = await User.findOne({ username: "a" });
    console.log("creating new board ");
    const name = req.body.name;
    //TODO: stop using default boards
    const newBoard = await makeDefaultBoard(name);
    user.boards.push(newBoard);
    await user.save();
    res.json(newBoard);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
