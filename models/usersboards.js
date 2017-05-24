"use strict";
module.exports = function(sequelize, DataTypes) {
  var UsersBoards = sequelize.define(
    "UsersBoards",
    {
      userId: DataTypes.INTEGER,
      boardId: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          UsersBoards.belongsTo(models.Board, {
            foreignKey: "boardId"
          });
          UsersBoards.belongsTo(models.User, {
            foreignKey: "userId"
          });
        }
      }
    }
  );
  return UsersBoards;
};
