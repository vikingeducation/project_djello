const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity"
    }
  ],
  board: { type: Schema.Types.ObjectId, ref: "Board" }
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
