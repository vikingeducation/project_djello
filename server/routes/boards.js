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
  // console.log("req.params = ", req.params);
  let boardId = req.params.id;
  // let boardId = req.body.board;
  console.log(`req.body = ${req.body}`);
  console.log(req.body);
  const userId = req.query.user;
  let selectedBoard;
  try {
    user = await getFullUserData({ username: userId });
    console.log("user = ", user);
    if (!user) return res.sendStatus(404);
    await Board.find().then(console.log);
    console.log(`boardId = ${boardId}`);
    console.log(boardId);
    console.log(`board id type = ${typeof boardId}`);
    await Board.remove({ _id: boardId });
    await Board.find().then(console.log);
    console.log("user = ", user);
    // console.log("boards[0] = ", user.boards[0]);
    // console.log("boards[0]._id = ", user.boards[0]._id);
    // console.log(user.boards);
    // user.boards = user.boards.filter(board => {
    //   return !(boardId == board._id);
    // });
    // user.boards.forEach(board => {
    //   if (board._id == boardId) {
    //     console.log("found board");
    //     selectedBoard = board;
    //   }
    //   console.log(`board = ${board._id}`);
    // });
    // selectedBoard = user.boards.find(board => {
    //   console.log("board = ");
    //   return boardId === board._id;
    // });
    console.log(`deleting board ${selectedBoard}`);
    // delete selectedBoard;
    console.log("user is now", user);
    // await user.save();
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
    console.log("name = ", req.body.name);
    const newBoard = await makeDefaultBoard(name);
    res.json(newBoard);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
