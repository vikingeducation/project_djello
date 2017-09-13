const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;

const { User, Board, Card } = require("../models");

const addUser = async user => {
  let { email, password, photoUrl, boards, cards } = user;
  try {
    return await new User({
      email,
      password,
      photoUrl: photoUrl || "",
      boards: boards || [],
      cards: cards || []
    }).save();
  } catch (err) {
    throw err;
  }
};

const getUser = async id => {
  try {
    return await User.findById(id);
  } catch (err) {
    throw err;
  }
};

const getUsers = async () => {
  try {
    return await User.find();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addUser,
  getUser,
  getUsers
};
