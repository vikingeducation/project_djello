const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const models = require("../models");
const { User, Board, List, Card } = models;

const getBoards = async (query = {}) => {
  let boards;
  try {
    boards = await Board.find(query);
    if (boards) return boards;
    return null;
  } catch (e) {
    console.error(e);
    return e;
  }
};

//creates a board and adds it to a user
const createBoard = async (userId, newBoard) => {
  //create the board
  //nest it under the user
  try {
    const userPromise = User.findOne({ username: "a" });
    const boardPromise = makeDefaultBoard(newBoard.name);
    const [user, board] = await Promise.all([userPromise, boardPromise]);
    user.boards.push(board);
    await user.save();
    return board;
  } catch (e) {
    console.error(e);
    return e;
  }
};

const deleteBoard = async boardId => {
  try {
    const response = await Board.findByIdAndRemove(boardId);
    console.log("delete response = ", response);
    return true;
  } catch (e) {
    console.error(e);
    return e;
  }
};

const makeDefaultBoard = async (name = "Sample Game Dev Board") => {
  //default list: Bugs, To Implement, Planned Features, Feature Creep, Research, Suggested Features

  //bug list
  let stockCards = Array(7)
    .fill(1)
    .map(card => randoCard());
  stockCards = await Promise.all(stockCards);

  const bugList = await List.create({
    title: "Bugs",
    description: "11/10 would list again",
    cards: stockCards
  });

  //to implement list
  stockCards = Array(8)
    .fill(1)
    .map(card => randoCard());
  stockCards = await Promise.all(stockCards);
  const implementList = await List.create({
    title: "To Implement",
    description: "11/10 would list again",
    cards: stockCards
  });

  //plannedfeatures list
  stockCards = Array(12)
    .fill(1)
    .map(card => randoCard());
  stockCards = await Promise.all(stockCards);
  const plannedList = await List.create({
    title: "Planned Features",
    description: "11/10 would list again",
    cards: stockCards
  });

  //feature creep list
  stockCards = Array(22)
    .fill(1)
    .map(card => randoCard());
  stockCards = await Promise.all(stockCards);
  const creepList = await List.create({
    title: "Feature Creep",
    description: "11/10 would list again",
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
  return () => {
    return Card.create({
      title: `card${counter++}`,
      description: "stuff",
      comments: ["not implemented"],
      activity: ["not implemented"],
      members: ["not implemented"],
      labels: ["not implemented"]
    });
  };
})();

module.exports = {
  createBoard,
  getBoards,
  deleteBoard
};
