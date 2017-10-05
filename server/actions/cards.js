const { Card, List } = require("../models");
const errorWrapper = require("./errors")("cardError");

const getCard = async (client, slug) => {
  const card = await Card.findOne({ slug }).populate("members activities");
  if (card) {
    client.emit("getCardSuccess", card);
  } else {
    throw new Error("Failed to find card");
  }
};

const addCard = async (client, { title, slug }) => {
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
};

const delCard = async (client, slug) => {
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
};

module.exports = client => {
  client.on("getCard", errorWrapper(client, getCard));
  client.on("addCard", errorWrapper(client, addCard));
  client.on("delCard", errorWrapper(client, delCard));
};
