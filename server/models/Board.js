const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = Schema({
  title: { type: String, required: true },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
