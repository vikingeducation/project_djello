"use strict";
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define(
    "Card",
    {
      listId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          Card.belongsTo(models.List, {
            foreignKey: "listId"
          });
          Card.hasMany(models.Activity, {
            foreignKey: "cardId"
          });
          Card.hasMany(models.UsersCards, {
            foreignKey: "cardId"
          });
          Card.belongsToMany(models.User, {
            through: models.UsersCards,
            as: "MemberOfCard",
            foreignKey: "cardId"
          });
        }
      }
    }
  );
  return Card;
};
