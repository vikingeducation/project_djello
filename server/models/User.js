const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const rounds = 12;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    emaiL: String,
    hashedPassword: {
      type: String,
      required: true
    },
    boards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board"
      }
    ]
  },
  {
    timestamps: true
  }
);
UserSchema.virtual("password").set(function(clearText) {
  this.hashedPassword = bcrypt.hashSync(clearText, rounds);
});
UserSchema.virtual("password").get(function() {
  return this.hashedPassword;
});
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
