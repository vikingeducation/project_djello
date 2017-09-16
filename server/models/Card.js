const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    title: String,
    comments: [
      {
        type: String
      }
    ],
    activity: [
      {
        type: String
      }
    ],
    memebers: [
      {
        type: String
      }
    ],
    labels: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);
const Card = mongoose.model("Card", CardSchema);
module.exports = Card;
