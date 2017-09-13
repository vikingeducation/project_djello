const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  card: { type: Schema.Types.ObjectId, ref: "Card" }
});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
