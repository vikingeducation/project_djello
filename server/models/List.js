const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    title: { type: String, required: true },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board"
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card"
      }
    ]
  },
  { timestamps: true }
);

const autoPopulateChildren = function(next) {
  this.populate("cards");
  next();
};

ListSchema.pre("findOne", autoPopulateChildren).pre(
  "find",
  autoPopulateChildren
);

const List = mongoose.model("List", ListSchema);

module.exports = List;
