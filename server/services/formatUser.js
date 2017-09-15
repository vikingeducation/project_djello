const tokens = require("../tokens.json");

module.exports = (user, username) => {
  return {
    firstName: user.fname,
    lastName: user.lname,
    email: user.email,
    username: user.username,
    token: tokens[username],
    id: user._id,
    boards: [user.boards]
  };
};
