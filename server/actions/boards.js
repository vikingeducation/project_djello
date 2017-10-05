const { Board, User } = require("../models");
const errorWrapper = require("./errors")("boardError");

const getBoard = async (client, slug) => {
  const board = await Board.findOne({ slug });
  if (
    board &&
    board.members.some(member => member.username === client.user.username)
  ) {
    client.emit("getBoardSuccess", board);
  } else {
    throw new Error("Failed to find board");
  }
};

const addBoard = async (client, title) => {
  const board = await Board.create({ members: [client.user._id], title });
  if (board) {
    client.user = await User.findOneAndUpdate(
      { _id: client.user._id },
      { $push: { boards: board } },
      { new: true }
    );
    client.emit("addBoardSuccess", board, client.user.boards);
  } else {
    throw new Error("Failed to create board");
  }
};

const delBoard = async (client, slug) => {
  const board = await Board.findOneAndRemove({ slug });
  if (board) {
    client.user = await User.findOne({ _id: client.user._id });
    client.emit("delBoardSuccess", client.user.boards);
  } else {
    throw new Error("Failed to delete board");
  }
};

const boards = client => {
  client.on("getBoard", errorWrapper(client, getBoard));
  client.on("addBoard", errorWrapper(client, addBoard));
  client.on("delBoard", errorWrapper(client, delBoard));
};

module.exports = boards;
