"use strict";
var models = require("../models");
module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define("Board", {
    title: DataTypes.STRING
  });
  Board.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.List, { foreignKey: "boardid" });
  };
  return Board;
};
