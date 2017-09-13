const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.virtual("password").set(password => {
  this.hashedPassword = bcrypt.hashSync(password);
});

UserSchema.method.validatePassword = password => {
  return bcrypt.compareSync(this.hashedPassword, password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
