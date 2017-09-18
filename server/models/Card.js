const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: String,
    description: String,
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    activities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity"
      }
    ],
    list: {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  },
  {
    timestamps: true
  }
);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;