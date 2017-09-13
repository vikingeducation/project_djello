const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
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
