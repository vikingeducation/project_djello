const router = require("express").Router();
const { User } = require("../models");
const { getFullUserData } = require("../controllers");
const { createBoard } = require("../controllers/boards");

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
//NOT IMPLEMENTED
router.put("/:id", async (req, res) => {
  res.sendStatus(501);
});
//NOT IMPLEMENTED
router.delete("/:id", async (req, res) => {
  res.sendStatus(501);
});

//GET ALL THE BOARDS FOR A USER
router.get("/:id/boards", async (req, res) => {
  //TODO: implement user tokens
  //grab the token
  let user;
  const userId = req.params.id;
  try {
    user = await getFullUserData({ username: userId });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  if (!user) return res.sendStatus(404);

  return res.json(user.boards);
});

//CREATE A BOARD FOR A USER
router.post("/:userId/boards", async (req, res) => {
  //grab the user
  console.log("making DA BOARDS !!!!!!");
  let userId = req.params.userId;
  ///
  //set a default board if we didn't get one
  let boardData = { name: "AMAZING NEW BOARD" };
  if (Object.entries(req.body).length) {
    boardData = req.body;
  }
  let createdBoard;
  try {
    createdBoard = await createBoard(userId, boardData);
  } catch (e) {
    console.error(e);
    return res.sendStatus(501);
  }
  res.append("Content-Type", "text/plain");
  res.append("Content-Location", `/boards/$${createdBoard._id}`);
  res.append("Location", `/boards/$${createdBoard._id}`);
  console.log("res.headers = ", res);
  return res.sendStatus(201);
  // return res.json({ location: createdBoard._id });
  // res.json(board);
  //return 201
});

module.exports = router;
