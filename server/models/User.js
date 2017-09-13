//TODO: SETUP PASSWORD HASHING

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: String
  },
  {
    timestamps: true
  }
);
//
// UserSchema.methods.getPhoto = key =>
//   this.photos.find(photo => photo.key === key);

const User = mongoose.model("User", UserSchema);
module.exports = User;
