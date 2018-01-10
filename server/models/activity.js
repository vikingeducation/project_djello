"use strict";
module.exports = (sequelize, DataTypes) => {
  var Activity = sequelize.define("Activity", {
    card: DataTypes.INTEGER
  });

  Activity.associate = function(models) {
    Activity.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  Activity.associate = function(models) {
    Activity.belongsTo(models.Card, {
      foreignKey: "cardid"
    });
  };

  return Activity;
};
