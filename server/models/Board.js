const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
        // alias: "Lists"
      }
    ],
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
const Board = mongoose.model("Board", BoardSchema);
module.exports = Board;
