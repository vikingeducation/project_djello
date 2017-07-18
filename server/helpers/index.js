const checkUserBoardPermissions = (board, user) => {
  let allUsers = board.users.map(user => user.toString());
  return allUsers.includes(user);
};

const apiMessages = {
  successfulPost: "Resource successfully updated.",
  successfulPut: "Resource successfully updated.",
  successfulDelete: "Resource successfully removed.",
  failedAuth: "You are not authorized to modify or remove this resource.",
  doesNotExist: resouce => `${resource} does not exist.`
};

module.exports = {
  checkUserBoardPermissions,
  apiMessages
};
