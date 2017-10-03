//
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
    return e;
  }
};

const getCard = async cardId => {
  let card;
  try {
    card = await Card.findById(cardId);
    if (!card) return false;
  } catch (e) {
    console.error(e);
    return e;
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
//how do I change a specific thing???
//I can't just diff them
//because your change could overwrite another user's change
///////.....hmmmm.....
const updateCard = async card => {
  let oldCard;
  try {
    oldCard = await Card.findById(card._id);
    if (!oldCard) return false;
  } catch (e) {
    console.error(e);
    return e;
  }
  oldCard.description = card.description;
  oldCard.title = card.title;
  await oldCard.save();
  return oldCard;
};

const deleteCard = async cardId => {
  //delete a card and update the user
  try {
    Card.findByIdAndRemove(cardId);
    return cardId;
  } catch (e) {
    console.error(e);
    return e;
  }
};

module.exports = {
  createCard,
  getCard,
  getCards,
  updateCard,
  deleteCard
};
