const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");
const wrapper = require("./errors");

const BoardSchema = new Schema(
  {
    // Relationships
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],

    // Properties
    slug: { type: String, default: shortid.generate },
    title: { type: String, required: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

BoardSchema.virtual("lists", {
  ref: "List",
  localField: "_id",
  foreignField: "board"
});

// Hooks
const removeFromUser = async function() {
  await mongoose
    .model("User")
    .update({ _id: { in: this.members } }, { $pull: { boards: this._id } });
};
BoardSchema.pre("remove", wrapper(removeFromUser));

const populateAll = function(next) {
  this.populate({ path: "lists" });
  this.populate({ path: "members", select: "username" });
  next();
};

BoardSchema.pre("find", populateAll)
  .pre("findOne", populateAll)
  .pre("findOneAndUpdate", populateAll)
  .pre("update", populateAll);

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
