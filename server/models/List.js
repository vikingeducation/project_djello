const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const ListSchema = new Schema(
  {
    // Relationships
    board: { type: Schema.Types.ObjectId, ref: "Board", required: true },

    // Properties
    slug: { type: String, default: shortid.generate },
    title: { type: String, required: true },
    description: { type: String }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

ListSchema.virtual("cards", {
  ref: "Card",
  localField: "_id",
  foreignField: "list"
});

const populateAll = function(next) {
  this.populate({ path: "cards" });
  next();
};

ListSchema.pre("find", populateAll)
  .pre("findOne", populateAll)
  .pre("findOneAndUpdate", populateAll)
  .pre("update", populateAll);

const List = mongoose.model("List", ListSchema);

module.exports = List;
