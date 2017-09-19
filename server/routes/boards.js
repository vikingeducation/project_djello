//TODO: a get all boards api endpoint might be nifty
//maybe add some privacy settings, and some statistics as well to boards
const router = require("express").Router();
const { Board, User } = require("../models");
const { makeDefaultBoard, getFullUserData } = require("../controllers");

//GET ALL THE BOARDS FOR A USER
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

//GET A BOARD
// /boards/id?user=id&populated=<bool>
router.get("/:id", async (req, res) => {
  //get the user
  //authenticate
  const boardId = req.params.id;
  const userId = req.query.user;
  let board;
  try {
    if (req.params.populated) {
      console.log("populating board");
      board = await Board.findById(boardId).populate({
        path: "lists",
        populate: {
          path: "cards"
        }
      });
    } else {
      console.log("not populating board");
      board = await Board.findById(boardId);
    }
    if (board === null) return res.sendStatus(404);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  console.log("board found = ", board);
  return res.json(board);
});

//GET ALL LISTS FROM A BOARD
// /boards/id?user=id
router.get("/:id/lists", async (req, res) => {
  //get the user
  //authenticate
  const boardId = req.params.board;
  const userId = req.query.user;
  let board;
  try {
    board = await Board.findById(boardId).populate({
      path: "lists",
      populate: {
        path: "cards"
      }
    });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }

  return res.json(board.lists);
});

//DELETE A BOARD
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

//CREATE A BOARD
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

//NOT IMPLEMENTED
//DELETE ALL THE BOARDS BECAUSE MAYHEM
router.delete(`/`, async (req, res) => {
  console.log("deleting everything");
  try {
    // user = await getFullUserData({ username: userId });
    //
    // if (!user) return res.sendStatus(404);
    //
    // //delete the board
    // await Board.remove({ _id: boardId });
    // //remove the reference from user
    // user.boards = user.boards.filter(board => {
    //   return !(boardId == board._id);
    // });
    //
    // await user.save();
    // // await User.find().then(console.log);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  res.sendStatus(502);
});

module.exports = router;
