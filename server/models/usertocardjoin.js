"use strict";
module.exports = (sequelize, DataTypes) => {
  var UserToCardJoin = sequelize.define("UserToCardJoin", {
    cardId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  UserToCardJoin.associate = function(models) {
    UserToCardJoin.belongsTo(models.Card, {
      foreignKey: "cardId"
    });

    UserToCardJoin.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  return UserToCardJoin;
};
