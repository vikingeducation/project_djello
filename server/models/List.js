const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    title: { type: String, required: true },
    board: {
      type: Schema.Types.ObjectID,
      ref: "Board"
    },
    cards: [
      {
        type: Schema.Types.ObjectID,
        ref: "Card"
      }
    ]
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);

module.exports = List;
