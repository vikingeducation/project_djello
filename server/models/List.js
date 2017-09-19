const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ],
  board: { type: Schema.Types.ObjectId, ref: "Board" }
});

const List = mongoose.model("List", ListSchema);

module.exports = List;
