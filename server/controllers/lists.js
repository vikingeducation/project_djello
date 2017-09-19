const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;

const { List } = require("../models");

const addList = async list => {
  let { title, description, board, cards } = list;
  try {
    return await new List({
      title,
      description,
      board,
      cards: []
    }).save();
  } catch (err) {
    throw err;
  }
};

const getList = async id => {
  try {
    return await List.findById(id);
  } catch (err) {
    throw err;
  }
};

const getLists = async () => {
  try {
    return await List.find();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  addList,
  getList,
  getLists
};
