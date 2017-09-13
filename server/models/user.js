const bcrypt = require("bcrypt");
const models = require("./");

("use strict");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
