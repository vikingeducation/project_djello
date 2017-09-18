//jumble of functions
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const models = require("../models");
const { User, Board, List, Card } = models;
// const mongodbUrl = "mongodb://localhost/project_djello_dev";

//check connection
// debugger;
// const connection = require("../mongo");
// if (!mongoose.connection.readyState) {
//   connection();
// }

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
// const dfBoard = makeDefaultBoard().then(board => {
//   console.log(board);
//   mongoose.disconnect();
// });

// console.log(dfBoard);
module.exports = {
  makeDefaultBoard,
  getFullUserData
};
