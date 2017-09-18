const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;

const jwt = require("jsonwebtoken");

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

const getUser = async userObj => {
  const { id, email } = userObj;
  try {
    return id ? await User.findById(id) : User.findOne({ email });
  } catch (err) {
    throw err;
  }
};

const getUsers = async () => {
  console.log("users schema: ", Object.keys(User.schema.paths));
  try {
    return await User.find();
  } catch (err) {
    throw err;
  }
};

const validateUser = async (email, password) => {
  try {
    const user = await getUser({ email });
    if (!user) throw new Error("Cannot find user in database");
    if (!user.validatePassword(password))
      throw new Error("User password is incorrect");

    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "1d" });
    return {
      email,
      token,
      error: null
    };
  } catch (error) {
    console.log(error);
    return { error: erorr.message };
  }
};

module.exports = {
  addUser,
  getUser,
  getUsers,
  validateUser
};
