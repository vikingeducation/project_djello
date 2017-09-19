const { Board } = require("../models");

const errorHandler = (client, event, error) => {
  console.error(error.message);
  console.error(error.stack);
  client.emit(event, error.message);
};

const getBoard = client => async slug => {
  try {
    const board = await Board.findOne({ slug })
      .populate({
        path: "lists",
        populate: {
          path: "cards",
          model: "Card",
          populate: { path: "members", model: "User" }
        }
      })
      .populate({ path: "members" });
    if (board && board.members.some(member => member.id === client.user.id)) {
      client.emit("getBoardSuccess", board);
    } else {
      throw new Error("Failed to find board");
    }
  } catch (error) {
    errorHandler(client, "getBoardError", error);
  }
};

const addBoard = client => async ({ title }) => {
  try {
    const board = await Board.create({ title, members: [client.user._id] });
    if (board) {
      client.emit("addBoardSuccess", board);
    } else {
      throw new Error("Failed to create board");
    }
  } catch (error) {
    errorHandler(client, "addBoardError", error);
  }
};

const delBoard = client => async slug => {
  try {
    const board = await Board.findOneAndRemove({ slug });
    if (board) {
      client.emit("delBoardSuccess");
    } else {
      throw new Error("Failed to delete board");
    }
  } catch (error) {
    errorHandler(client, "delBoardError", error);
  }
};

const boards = client => {
  client.on("getBoard", getBoard(client));
  client.on("addBoard", addBoard(client));
  client.on("delBoard", delBoard(client));
};

module.exports = boards;
