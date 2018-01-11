"use strict";
module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define("Board", {
    name: DataTypes.STRING
  });

  Board.associate = function(models) {
    Board.hasMany(models.List, {
      foreignKey: "boardid"
    });

    Board.hasMany(models.UserToBoardJoin, {
      foreignKey: "boardid"
    });

    Board.belongsToMany(models.User, {
      through: models.UserToBoardJoin,
      as: "BoardId",
      foreignKey: "boardid"
    });
  };

  return Board;
};
