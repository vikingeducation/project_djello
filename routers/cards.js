const { List, Card } = require("../models");

module.exports = () => {
  const express = require("express");
  const cardsRouter = express.Router();

  cardsRouter.post("/", async (req, res, next) => {
    try {
      const { text, listId } = req.body;
      const card = await Card.create({ text });
      const list = await List.findById(listId);
      list.cards.push(card);
      await list.save();
      res.json(card);
    } catch (e) {
      throw e;
    }
  });

  return cardsRouter;
};
