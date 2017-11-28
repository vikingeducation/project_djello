"use strict";
var models = require("../models");
module.exports = (sequelize, DataTypes) => {
  var card = sequelize.define("card", {
    title: DataTypes.STRING,
    boardId: DataTypes.INTEGER,
    complete: DataTypes.BOOLEAN,
    members: DataTypes.ARRAY(DataTypes.INTEGER),
    activity: DataTypes.ARRAY(DataTypes.STRING)
  });
  card.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.board, { foreignKey: "boardId" });
  };
  return card;
};
