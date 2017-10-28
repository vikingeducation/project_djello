const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema(
  {
    // Relationships
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    card: { type: Schema.Types.ObjectId, ref: "card", required: true },

    // Properties
    body: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
