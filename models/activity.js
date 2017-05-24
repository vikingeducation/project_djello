"use strict";
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define(
    "Activity",
    {
      authorId: DataTypes.INTEGER,
      cardId: DataTypes.INTEGER,
      description: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          Activity.belongsTo(models.Card, {
            foreignKey: "cardId"
          });
          Activity.belongsTo(models.User, {
            foreignKey: "authorId"
          });
        }
      }
    }
  );
  return Activity;
};
