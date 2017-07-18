const checkUserBoardPermissions = (board, user) => {
  let allUsers = board.users.map(user => user.toString());
  return allUsers.includes(user);
};

module.exports = {
  checkUserBoardPermissions
};
