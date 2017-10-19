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
    accessToken: String,
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
//TODO: implement this
UserSchema.methods.getFreshAccessToken = async function() {
  if (!this.accessToken) {
    this.accessToken = "dank";
    await this.save();
  }
  return this.accessToken;
};
//TODO: implement this
UserSchema.methods.validateAccessToken = function(token) {
  if (!this.accessToken || !token) return false;
  // let isValid = bcrypt.compareSync(token, this.accessToken);
  let isValid = token === this.accessToken;
  console.log("is Valid token? ", isValid);
  return isValid;
};
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

UserSchema.virtual("password").set(function(clearText) {
  this.hashedPassword = bcrypt.hashSync(clearText, rounds);
});
UserSchema.virtual("password").get(function() {
  return this.hashedPassword;
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
