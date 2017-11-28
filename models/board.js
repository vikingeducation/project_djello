"use strict";
var models = require("../models");
module.exports = (sequelize, DataTypes) => {
  var board = sequelize.define("board", {
    title: DataTypes.STRING
  });
  board.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.card, { foreignKey: "boardId" });
  };
  return board;
};
