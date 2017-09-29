const router = require("express").Router();
const { createCard, updateCard } = require("../controllers");

//NOT IMPLEMENTED
router.get("/", async (req, res) => {
  res.sendStatus(501);
});
//NOT IMPLEMENTED
router.get("/:id", async (req, res) => {
  res.sendStatus(501);
});
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
//WORKING ON IT
router.put("/:id", async (req, res) => {
  let card = req.body;
  try {
    card = updateCard(card);
    if (card) return res.json(card);
    return res.sendStatus(404);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  // res.json(card);
});
//NOT IMPLEMENTED
router.delete("/:id", async (req, res) => {
  res.sendStatus(501);
});

//NOT ALLOWED
router.put("/", async (req, res) => {
  res.sendStatus(405);
});
router.patch("/", async (req, res) => {
  res.sendStatus(405);
});
router.delete("/", async (req, res) => {
  res.sendStatus(405);
});

module.exports = router;
