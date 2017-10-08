const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const uuid = require("uuid");
const wrapper = require("./errors");

const UserSchema = new Schema(
  {
    // Relationships
    boards: [{ type: Schema.Types.ObjectId, ref: "Board" }],
    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],

    // Properties
    token: { type: String },
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, select: false }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

UserSchema.virtual("activities", {
  ref: "Activity",
  localField: "_id",
  foreignField: "owner"
});

UserSchema.plugin(uniqueValidator);

// Hooks
UserSchema.pre("save", function(next) {
  this.token = md5(`${this.email}${uuid()}`);
  next();
});

const removeFromOthers = async function() {
  await Promise.all([
    mongoose
      .model("Board")
      .update({ _id: { in: this.boards } }, { $pull: { members: this._id } }),
    mongoose
      .model("Card")
      .update({ _id: { in: this.cards } }, { $pull: { members: this._id } })
  ]);
};
UserSchema.pre("remove", wrapper(removeFromOthers));

const populateBoards = function(next) {
  this.populate("boards");
  next();
};

UserSchema.pre("find", populateBoards)
  .pre("findOne", populateBoards)
  .pre("findOneAndUpdate", populateBoards)
  .pre("update", populateBoards);

// Instance Methods
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// Virtual Properties
UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
