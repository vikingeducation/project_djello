const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const ListSchema = new Schema(
  {
    // Relationships
    board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
    cards: [{ type: Schema.Types.ObjectId, ref: "List" }],

    // Properties
    slug: { type: String, default: shortid.generate },
    title: { type: String, required: true },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

// Hooks
ListSchema.pre("remove", async function(next) {
  const updates = [
    mongoose
      .model("Board")
      .update({ _id: this.board }, { $pull: { cards: this._id } }),
    mongoose.model("Card").remove({ _id: { in: this.cards } })
  ];
  Promise.all(updates).then(() => next());
});

const List = mongoose.model("List", ListSchema);

module.exports = List;
