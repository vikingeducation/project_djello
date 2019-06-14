"use strict";
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define("List", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    boardid: DataTypes.INTEGER
  });
  List.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Board, { foreignKey: "boardid" });
  };
  return List;
};
