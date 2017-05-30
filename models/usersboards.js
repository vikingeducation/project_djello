"use strict";
module.exports = function(sequelize, DataTypes) {
  var UsersBoards = sequelize.define(
    "UsersBoards",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      userId: DataTypes.INTEGER,
      boardId: { type: DataTypes.INTEGER, unique: false }
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
