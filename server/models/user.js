"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    accesstoken: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Activity, {
      foreignKey: "userId"
    });
  };

  return User;
};
