const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");
const wrapper = require("./errors");

const CardSchema = new Schema(
  {
    // Relationships
    list: { type: Schema.Types.ObjectId, ref: "List", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],

    // Properties
    slug: { type: String, default: shortid.generate },
    completed: { type: Boolean, default: false },
    title: { type: String, required: true },
    body: { type: String }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

CardSchema.virtual("activities", {
  ref: "Activity",
  localField: "_id",
  foreignField: "card"
});

// Hooks
const removeFromUser = async function() {
  await mongoose
    .model("User")
    .update({ _id: { in: this.members } }, { $pull: { cards: this._id } });
};
CardSchema.pre("remove", wrapper(removeFromUser));

const populateAll = function(next) {
  this.populate({ path: "members", model: "User", select: "username" });
  next();
};

CardSchema.pre("find", populateAll)
  .pre("findOne", populateAll)
  .pre("findOneAndUpdate", populateAll)
  .pre("update", populateAll);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
