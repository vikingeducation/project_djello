"use strict";
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define("List", {
    name: DataTypes.STRING
  });

  List.associate = function(models) {
    List.belongsTo(models.Board, {
      foreignKey: "boardId"
    });

    List.hasMany(models.Card, {
      foreignKey: "listId"
    });
  };

  return List;
};
