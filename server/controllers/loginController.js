const User = require("../models/User");

const loginController = {};

loginController.getUser = async username => {
  const user = await User.findOne({ username }).populate("boards");
  return user;
};

module.exports = loginController;
