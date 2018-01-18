"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Activity, {
      foreignKey: "userId"
    });

    User.hasMany(models.Board, {
      foreignKey: "userId"
    });

    User.hasMany(models.UserToCardJoin, {
      foreignKey: "userId"
    });

    User.belongsToMany(models.Card, {
      through: models.UserToCardJoin,
      as: "UserId",
      foreignKey: "userId"
    });
  };

  return User;
};
