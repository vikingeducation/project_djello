"use strict";
module.exports = (sequelize, DataTypes) => {
  var UserToCardJoin = sequelize.define("UserToCardJoin", {
    card: DataTypes.ID
  });

  UserToCardJoin.associate = function(models) {
    UserToCardJoin.belongsTo(models.Card, {
      foreignKey: "cardid"
    });

    UserToCardJoin.belongsTo(models.User, {
      foreignKey: "userid"
    });
  };

  return UserToCardJoin;
};
