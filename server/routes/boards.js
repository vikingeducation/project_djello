//TODO: a get all boards api endpoint might be nifty
//maybe add some privacy settings, and some statistics as well to boards
const router = require("express").Router();
const { Board, User } = require("../models");
const { makeDefaultBoard, getFullUserData } = require("../controllers");
const {
  createBoard,
  getBoards,
  deleteBoard
} = require("../controllers/boards");

//GET ALL THE BOARDS
//TODO: CHANGE THIS TO ALLOW FOR PRIVACY SETTINGS LATER
router.get("/", async (req, res) => {
  let boards;
  try {
    boards = await getBoards();
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  if (!boards) return res.sendStatus(404);

  return res.json(boards);
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
  // const userId = req.query.user;
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
  if (deleteBoard(boardId)) {
    return res.json(boardId);
  } else {
    res.sendStatus(500);
  }
});

//CREATE A BOARD
router.post("/", async (req, res) => {
  //grab the user and the name
  const user = {
    username: "a"
  };
  const newBoard = req.body;
  try {
    const createdBoard = createBoard(user, newBoard);
    console.log("making a board");
    if (createdBoard) {
      //TODO: MAKE RESTFUL LATER
      res.status(201);
      res.append("Content-Type", "text/plain");
      res.append("Content-Location", `/boards/$${createdBoard._id}`);
      res.append("Location", `/boards/$${createdBoard._id}`);
      console.log("res.headers = ", res.headers);
      return res.sendStatus(201);
      return res.json({ location: createdBoard._id });
      // // return res.end(`/boards/$${createdBoard._id}`);
      // return res.json(createdBoard);
    }
    return res.sendStatus(500);
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
    //
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  res.sendStatus(502);
});

module.exports = router;
