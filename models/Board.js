const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const BoardSchema = new Schema(
  {
    // Relationships
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lists: [{ type: Schema.Types.ObjectId, ref: "List" }],

    // Properties
    slug: { type: String, default: shortid.generate },
    title: { type: String, default: "Click to edit title" }
  },
  {
    timestamps: true
  }
);

// Hooks
BoardSchema.pre("remove", function(next) {
  const updates = [
    mongoose
      .model("User")
      .update({ _id: { in: this.members } }, { $pull: { boards: this._id } }),
    mongoose.model("List").remove({ _id: { in: this.lists } })
  ];
  Promise.all(updates).then(() => next());
});

BoardSchema.post("update", function(next) {
  this.remove({ members: { $size: 0 } }).then(() => next());
});

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
