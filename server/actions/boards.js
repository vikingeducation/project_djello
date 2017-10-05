const { Board, User } = require("../models");
const errorHandler = require("./errors")("boardError");
const { popBoard, projBoard } = require("./utils");

const getBoard = client => async slug => {
  try {
    const board = await Board.findOne({ slug }, projBoard)
      .populate(popBoard[0])
      .populate(popBoard[1]);
    if (
      board &&
      board.members.some(member => member.username === client.user.username)
    ) {
      client.emit("getBoardSuccess", board);
    } else {
      throw new Error("Failed to find board");
    }
  } catch (error) {
    errorHandler(client, error);
  }
};

const addBoard = client => async title => {
  try {
    const board = await Board.create({ members: [client.user._id], title });
    if (board) {
      client.user = await User.findByIdAndUpdate(
        client.user._id,
        { $push: { boards: board } },
        { new: true }
      ).populate("boards");
      client.emit("addBoardSuccess", board, client.user.boards);
    } else {
      throw new Error("Failed to create board");
    }
  } catch (error) {
    errorHandler(client, error);
  }
};

const delBoard = client => async slug => {
  try {
    const board = await Board.findOneAndRemove({ slug });
    if (board) {
      const user = await User.findById(client.user._id).populate("boards");
      client.emit("delBoardSuccess", user.boards);
    } else {
      throw new Error("Failed to delete board");
    }
  } catch (error) {
    errorHandler(client, error);
  }
};

const boards = client => {
  client.on("getBoard", getBoard(client));
  client.on("addBoard", addBoard(client));
  client.on("delBoard", delBoard(client));
};

module.exports = boards;
