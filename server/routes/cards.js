const router = require("express").Router();
const {
  createCard,
  getCard,
  getCards,
  updateCard,
  deleteCard
} = require("../controllers/cards");

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

//EDIT A CARD
router.put("/:id", async (req, res) => {
  let updatedFields = req.body.card;
  try {
    newCard = await updateCard(req.params.id, updatedFields);
    if (newCard) return res.json(newCard);
    return res.sendStatus(404);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});
//NOT IMPLEMENTED
router.delete("/:id", async (req, res) => {
  let deletedCard;
  try {
    deletedCard = await deleteCard(req.params.id);
    if (!deletedCard) return res.sendStatus(404);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  res.json({ _id: deletedCard._id });
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
