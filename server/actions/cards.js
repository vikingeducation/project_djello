const { Card, List } = require("../models");
const errorHandler = require("./errors")("cardError");

const getCard = client => async slug => {
  try {
    const card = await Card.findOne({ slug }).populate("members activities");
    if (card) {
      client.emit("getCardSuccess", card);
    } else {
      throw new Error("Failed to find card");
    }
  } catch (error) {
    errorHandler(client, error);
  }
};

const addCard = client => async (title, slug) => {
  try {
    let list = await List.findOne({ slug });
    const card = await Card.create({ title, list });
    if (card) {
      list = await List.findByIdAndUpdate(
        list._id,
        { $push: { cards: card } },
        { new: true }
      ).populate("cards");
      client.emit("addCardSuccess", card, list);
    } else {
      throw new Error("Failed to add card");
    }
  } catch (error) {
    errorHandler(client, error);
  }
};

const delCard = client => async slug => {
  try {
    const card = await Card.findOneAndRemove({ slug });
    if (card) {
      const list = await List.findByIdAndUpdate(
        list._id,
        { $push: { cards: card } },
        { new: true }
      ).populate("cards");
      client.emit("delCardSuccess", list);
    } else {
      throw new Error("Failed to delete card");
    }
  } catch (error) {
    errorHandler(client, error);
  }
};

module.exports = client => {
  client.on("getCard", getCard(client));
  client.on("addCard", addCard(client));
  client.on("delCard", delCard(client));
};
