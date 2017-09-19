const express = require("express");
const router = express();
const List = require("../models/List");
const Card = require("../models/Card");

router.post("/", async (req, res) => {
  const { description, list_id } = req.body;
  let card = new Card({
    description,
    list: list_id
  });
  card = await card.save();
  const updatedList = await List.update(
    { _id: list_id },
    { $push: { cards: card } }
  );
  const list = await List.findById(list_id).populate("cards");
  res.json(list);
});

module.exports = router;
