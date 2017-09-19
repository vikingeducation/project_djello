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
  try {
    return await User.find();
  } catch (err) {
    throw err;
  }
};

const generateToken = async (email, password) => {
  try {
    const user = await getUser({ email });
    if (!user) {
      let error = new Error("Cannot find email in database");
      error.name = "error_email";
      throw error;
    }
    if (!user.validatePassword(password)) {
      let error = new Error("User password is incorrect");
      error.name = "error_password";
      throw error;
    }

    const token = jwt.sign({ _id: user._id, email }, process.env.SECRET, {
      expiresIn: "1d"
    });
    return {
      token,
      _id: user._id,
      email,
      error: null
    };
  } catch (error) {
    throw error;
  }
};

const validateUser = async token => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

module.exports = {
  addUser,
  getUser,
  getUsers,
  generateToken,
  validateUser
};
