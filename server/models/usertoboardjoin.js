"use strict";
module.exports = (sequelize, DataTypes) => {
  var UserToBoardJoin = sequelize.define("UserToBoardJoin", {
    board: DataTypes.ID
  });

  UserToBoardJoin.associate = function(models) {
    // associations can be defined here
    UserToBoardJoin.belongsTo(models.Board, {
      foreignKey: "boardid"
    });

    UserToBoardJoin.belongsTo(models.User, {
      foreignKey: "userid"
    });
  };

  return UserToBoardJoin;
};
