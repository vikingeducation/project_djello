const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema(
  {
    title: String,
    lists: [{
      type: Schema.Types.ObjectId,
      ref: "List"
    }],
    users: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  {
    timestamps: true
  }
);

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
