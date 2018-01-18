"use strict";
module.exports = (sequelize, DataTypes) => {
  var Activity = sequelize.define("Activity", {
    cardId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    action: DataTypes.STRING
  });

  Activity.associate = function(models) {
    Activity.belongsTo(models.User, {
      foreignKey: "userId"
    });

    Activity.belongsTo(models.Card, {
      foreignKey: "cardId"
    });
  };

  return Activity;
};
