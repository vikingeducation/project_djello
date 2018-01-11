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

    User.hasMany(models.UserToBoardJoin, {
      foreignKey: "userId"
    });

    User.belongsToMany(models.Broad, {
      through: models.UserToBoardJoin,
      as: "UserId",
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
