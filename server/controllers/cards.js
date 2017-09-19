const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;

const { Card } = require("../models");

const addCard = async card => {
  let { title, description, list, activities } = card;
  try {
    return await new Card({
      title,
      description,
      list,
      activities: []
    }).save();
  } catch (err) {
    throw err;
  }
};

const getCard = async id => {
  try {
    return await Card.findById(id);
  } catch (err) {
    throw err;
  }
};

const getCards = async () => {
  try {
    return await Card.find();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  addCard,
  getCard,
  getCards
};
