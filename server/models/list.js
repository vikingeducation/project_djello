"use strict";
module.exports = function(sequelize, DataTypes) {
  var List = sequelize.define(
    "List",
    {
      boardId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          List.belongsTo(models.Board, {
            foreignKey: "boardId"
          });
          List.hasMany(models.Card, {
            foreignKey: "listId"
          });
        }
      }
    }
  );
  return List;
};
