const { Board, List } = require("../models");
const errorHandler = require("./errors")("boardError");
const { popList, projList, popBoard, projBoard } = require("./utils");

const getList = client => async slug => {
  try {
    const list = await List.findOne({ slug }, projList, popList);
    if (list) {
      client.emit("getListSuccess", list);
    } else {
      throw new Error("Failed to find list");
    }
  } catch (error) {
    errorHandler(client, error);
  }
};

const addList = client => async (title, slug) => {
  try {
    let board = await Board.findOne({ slug });
    const list = await List.create({ board });
    if (list) {
      board = await Board.findByIdAndUpdate(
        board._id,
        { $push: { lists: list } },
        { new: true }
      )
        .populate(popBoard[0])
        .populate(popBoard[1])
        .select(projBoard);
      client.emit("addListSuccess", list, board);
    } else {
      throw new Error("Failed to add list");
    }
  } catch (error) {
    errorHandler(client, error);
  }
};

const delList = client => async slug => {
  try {
    const list = await List.findOneAndRemove({ slug });
    if (list) {
      const board = await Board.findById(list.board, projBoard)
        .populate(popBoard[0])
        .populate(popBoard[1]);
      client.emit("delListSuccess", board);
    } else {
      throw new Error("Failed to delete list");
    }
  } catch (error) {
    errorHandler(client, error);
  }
};

module.exports = client => {
  client.on("getList", getList(client));
  client.on("addList", addList(client));
  client.on("delList", delList(client));
};
