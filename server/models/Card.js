const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const CardSchema = new Schema(
  {
    // Relationships
    list: { type: Schema.Types.ObjectId, ref: "List", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],

    // Properties
    slug: { type: String, default: shortid.generate },
    completed: { type: Boolean, default: false },
    title: { type: String, required: true },
    body: { type: String }
  },
  {
    timestamps: true
  }
);

// Hooks
CardSchema.pre("remove", function(next) {
  const updates = [
    mongoose
      .model("List")
      .update({ _id: this.list }, { $pull: { cards: this._id } }),
    mongoose
      .model("User")
      .update({ _id: { in: this.members } }, { $pull: { cards: this._id } }),
    mongoose.model("Activity").remove({ _id: { in: this.activities } })
  ];
  Promise.all(updates).then(() => next());
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
