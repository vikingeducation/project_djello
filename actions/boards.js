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
    board
      ? client.emit("getBoardSuccess", board)
      : new Error("Failed to find board");
  } catch (error) {
    console.log();
    errorHandler(client, "getBoardError", error);
  }
};

const boards = client => {
  client.on("getBoard", getBoard(client));
};

module.exports = boards;
