const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

//Image, might have to do some fanciness to store the image on the AWS S3 bucket

const UserSchema = Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  photoUrl: { type: String },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board"
    }
  ],
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ]
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
