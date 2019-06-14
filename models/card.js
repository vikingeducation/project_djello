"use strict";
var models = require("../models");
module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define("Card", {
    title: DataTypes.STRING,
    listid: DataTypes.INTEGER,
    description: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    members: DataTypes.ARRAY(DataTypes.INTEGER),
    activity: DataTypes.ARRAY(DataTypes.STRING)
  });
  Card.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.List, { foreignKey: "listid" });
  };
  return Card;
};
