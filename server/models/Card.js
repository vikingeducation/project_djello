const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    description: { type: String, required: true },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
