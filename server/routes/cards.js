const router = require("express").Router();
const { createCard } = require("../controllers");

//NOT IMPLEMENTED
router.get("/", async (req, res) => {
  res.sendStatus(501);
});
//NOT IMPLEMENTED
router.get("/:id", async (req, res) => {
  res.sendStatus(501);
});
//WORKING ON IT
//CREATE A CARD
router.post("/", async (req, res) => {
  const { listId, title } = req.body;
  let card;
  try {
    card = createCard(listId, title);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  res.json(card);
});
//NOT IMPLEMENTED
router.put("/:id", async (req, res) => {
  res.sendStatus(501);
});
//NOT IMPLEMENTED
router.delete("/:id", async (req, res) => {
  res.sendStatus(501);
});

module.exports = router;
