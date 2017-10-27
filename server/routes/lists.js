const { User, Board, List } = require("../models");
const { updateList, deleteList } = require("../controllers");
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

//GET A LIST
router.get("/:id", async (req, res) => {
  //get the user
  //authenticate
  let list;
  try {
    list = await List.findById(req.params.id).populate("cards");
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  return res.json(list);
});

//CREATE A LIST
router.post("/", async (req, res) => {
  //grab the user and the name
  const { boardId, name } = req.body;
  console.log("bid name", boardId, name);
  try {
    //TODO: change the double await later, maybe a Promise resolve all
    const board = await Board.findById(boardId).populate("lists");
    const list = await List.create({
      title: name || "listy list list",
      description: "11/10 would list again",
      cards: []
    });
    board.lists.push(list);
    await board.save();
    return res.json(list);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

//NOT IMPLEMENTED     ///? or is it
router.put("/:id", async (req, res) => {
  try {
    let list = req.body;
    console.log("list from front-end = ", list);
    const result = await updateList(req.params.id, list);
    if (result) return res.sendStatus(204);
    return res.sendStatus(404);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});
//NOT IMPLEMENTED
router.put("/", async (req, res) => {
  return res.sendStatus(501);
});

//DELETE A LIST
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
