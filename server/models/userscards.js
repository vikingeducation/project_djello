"use strict";
module.exports = function(sequelize, DataTypes) {
  var UsersCards = sequelize.define(
    "UsersCards",
    {
      fixId: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      memberId: DataTypes.INTEGER,
      cardId: { type: DataTypes.INTEGER, unique: false }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          UsersCards.belongsTo(models.Card, {
            foreignKey: "cardId"
          });
          UsersCards.belongsTo(models.User, {
            foreignKey: "memberId"
          });
        }
      }
    }
  );
  return UsersCards;
};
