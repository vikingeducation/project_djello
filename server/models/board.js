"use strict";
module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define("Board", {
    name: DataTypes.STRING
  });

  Board.associate = function(models) {
    Board.hasMany(models.List, {
      foreignKey: "boardid"
    });
  };

  return Board;
};
