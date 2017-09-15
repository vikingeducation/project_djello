const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Card"
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
const List = mongoose.model("List", ListSchema);
module.exports = List;
