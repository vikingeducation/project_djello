"use strict";
module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define("Card", {
    name: DataTypes.STRING
  });

  Card.associate = function(models) {
    Card.belongsTo(models.List, {
      foreignKey: "listid"
    });

    Card.hasMany(models.Activity, {
      foreignKey: "cardid"
    });

    Card.hasMany(models.UserToCardJoin, {
      foreignKey: "cardid"
    });

    Card.belongsToMany(models.User, {
      through: models.UserToCardJoin,
      as: "CardId",
      foreignKey: "cardid"
    });
  };

  return Card;
};
