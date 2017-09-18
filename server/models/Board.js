const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  ]
});

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
