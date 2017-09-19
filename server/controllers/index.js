//jumble of functions
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const models = require("../models");
const { User, Board, List, Card } = models;

const deleteCard = async cardId => {
  //delete a card and update the user
  try {
    Card.findByIdAndRemove(cardId);
    return cardId;
  } catch (e) {
    console.error(e);
    return e;
  }

  /* test code
  Card.findById(cardId)
  Card.deleteOne({title: 'card0'}).then(lg)
  Card.find().then(lg)
  Card.deleteMany().then(lg)
  Card.find().then(lg)
  User.findOne({ username: "a" }).populate({
    path: "boards",
    populate: {
      path: "lists",
      populate: {
        path: "cards"
      }
    }
  }).then(user => console.log(user.boards.cards))*/
};
const deleteList = async listId => {
  try {
    return await List.findByIdAndRemove(listId);
    // return listId;
  } catch (e) {
    console.error(e);
    return e;
  }
};
const deleteBoard = async boardId => {
  try {
    Board.findByIdAndRemove(boardId);
    return boardId;
  } catch (e) {
    console.error(e);
    return e;
  }
};

const getFullUserData = async (query = { username: "a" }) => {
  const user = await User.findOne(query).populate({
    path: "boards",
    populate: {
      path: "lists",
      populate: {
        path: "cards"
      }
    }
  });
  return user;
};
//make a default board
const makeDefaultBoard = async (name = "Sample Game Dev Board") => {
  //default list: Bugs, To Implement, Planned Features, Feature Creep, Research, Suggested Features

  //bug list
  let stockCards = Array(2)
    .fill(1)
    .map(card => randoCard());
  stockCards = await Promise.all(stockCards);

  const bugList = await List.create({
    title: "Bugs",
    cards: stockCards
  });

  //to implement list
  stockCards = Array(2)
    .fill(1)
    .map(card => randoCard());
  stockCards = await Promise.all(stockCards);
  const implementList = await List.create({
    title: "To Implement",
    cards: stockCards
  });

  //plannedfeatures list
  stockCards = Array(2)
    .fill(1)
    .map(card => randoCard());
  stockCards = await Promise.all(stockCards);
  const plannedList = await List.create({
    title: "Planned Features",
    cards: stockCards
  });

  //feature creep list
  stockCards = Array(2)
    .fill(1)
    .map(card => randoCard());
  stockCards = await Promise.all(stockCards);
  const creepList = await List.create({
    title: "Feature Creep",
    cards: stockCards
  });
  //a default board
  return Board.create({
    title: name,
    lists: [bugList, implementList, plannedList, creepList]
  });
};
const randoCard = (() => {
  let counter = 0;
  return async () => {
    return Card.create({
      title: `card${counter++}`,
      comments: ["not implemented"],
      activity: ["not implemented"],
      members: ["not implemented"],
      labels: ["not implemented"]
    });
  };
})();

module.exports = {
  makeDefaultBoard,
  getFullUserData,
  deleteCard,
  deleteList,
  deleteBoard
};
