"use strict";
module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define("Card", {
    name: DataTypes.STRING,
    body: DataTypes.STRING,
    listId: DataTypes.INTEGER
  });

  Card.associate = function(models) {
    Card.belongsTo(models.List, {
      foreignKey: "listId"
    });

    Card.hasMany(models.Activity, {
      foreignKey: "cardId"
    });

    Card.hasMany(models.UserToCardJoin, {
      foreignKey: "cardId"
    });

    Card.belongsToMany(models.User, {
      through: models.UserToCardJoin,
      as: "CardId",
      foreignKey: "cardId"
    });
  };

  return Card;
};
