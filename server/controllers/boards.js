const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;

const { Board } = require("../models");

const addBoard = async board => {
  try {
    return await new Board(board).save();
  } catch (err) {
    throw err;
  }
};

const getBoard = async id => {
  try {
    return await Board.findById(id);
  } catch (err) {
    throw err;
  }
};

const getBoards = async () => {
  try {
    return await Board.find();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  addBoard,
  getBoard,
  getBoards
};
