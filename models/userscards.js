"use strict";
module.exports = function(sequelize, DataTypes) {
  var UsersCards = sequelize.define(
    "UsersCards",
    {
      memberId: DataTypes.INTEGER,
      cardId: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          UsersCards.belongsTo(models.Card, {
            foreignKey: "cardId"
          });
          UsersCards.belongsTo(models.User, {
            foreignKey: "memberId",
            as: "MemberOfCard"
          });
        }
      }
    }
  );
  return UsersCards;
};
