"use strict";
module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define("Board", {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });

  Board.associate = function(models) {
    Board.hasMany(models.List, {
      foreignKey: "boardId"
    });

    Board.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  return Board;
};
