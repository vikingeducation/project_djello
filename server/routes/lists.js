const { User, Board } = require("../models");
const { deleteList } = require("../controllers");
const router = require("express").Router();

//this route path is mighty fishy feeling
router.get("/", async (req, res) => {
  //get the user
  //authenticate
  const boardId = req.query.board;
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

//NOT IMPLEMENTED
router.post("/", async (req, res) => {
  return res.sendStatus(501);
});

//NOT IMPLEMENTED
router.put("/", async (req, res) => {
  return res.sendStatus(501);
});

//NOT IMPLEMENTED
router.delete("/:id", async (req, res) => {
  // console.log("deleting list ", req.params.id);
  try {
    let result = await deleteList(req.params.id);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
});

module.exports = router;
