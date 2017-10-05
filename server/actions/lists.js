const { Board, List } = require("../models");
const errorWrapper = require("./errors")("listError");

const getList = async (client, slug) => {
  const list = await List.findOne({ slug });
  if (list) {
    client.emit("getListSuccess", list);
  } else {
    throw new Error("Failed to find list");
  }
};

const addList = async (client, { title, slug }) => {
  let board = await Board.findOne({ slug });
  const list = await List.create({ board, title });
  if (list) {
    board = await Board.findOneAndUpdate(
      { _id: board._id },
      { $push: { lists: list } },
      { new: true }
    );
    client.emit("addListSuccess", list, board);
  } else {
    throw new Error("Failed to add list");
  }
};

const delList = async (client, slug) => {
  const list = await List.findOneAndRemove({ slug });
  if (list) {
    const board = await Board.findOne({ _id: list.board._id });
    client.emit("delListSuccess", board);
  } else {
    throw new Error("Failed to delete list");
  }
};

module.exports = client => {
  client.on("getList", errorWrapper(client, getList));
  client.on("addList", errorWrapper(client, addList));
  client.on("delList", errorWrapper(client, delList));
};
