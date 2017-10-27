const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const { User, Board, List, Card } = require("../models");

const createCard = async (listId, title = "SUCH CARDS") => {
  try {
    const card = await Card.create({
      title: title,
      description: "things!!!!",
      comments: ["not implemented"],
      activity: ["not implemented"],
      members: ["not implemented"],
      labels: ["not implemented"]
    });
    let list = await List.findById(listId);
    list.cards.push(card);
    list.save();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getCard = async cardId => {
  let card;
  try {
    card = await Card.findById(cardId);
    if (!card) return false;
  } catch (e) {
    console.error(e);
    throw e;
  }
  return card;
};

//TODO:
//POSSIBLY CHANGE THIS LATER WHEN IT'S USED
const getCards = async cardIds => {
  // let cards
  // try {
  //   cards = await Card.findById(cardIds);
  //   if (!card) return false;
  // } catch (e) {
  //   console.error(e);
  //   return e;
  // }
  // return cards;
  return false;
};
//UPDATE ONE CARD
const updateCard = async (cardId, updatedFields) => {
  let oldCard;
  try {
    oldCard = await Card.findById(cardId);
    if (!oldCard) return false;
  } catch (e) {
    console.error(e);
    throw e;
  }
  for (let key in updatedFields) {
    oldCard[key] = updatedFields[key];
  }
  await oldCard.save();
  return oldCard;
};
//DELETE A CARD
const deleteCard = async cardId => {
  try {
    Card.findByIdAndRemove(cardId);
    return cardId;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  createCard,
  getCard,
  getCards,
  updateCard,
  deleteCard
};
