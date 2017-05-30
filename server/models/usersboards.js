"use strict";
module.exports = function(sequelize, DataTypes) {
  var UsersBoards = sequelize.define(
    "UsersBoards",
    {
      fixId: {
        type: DataTypes.BIGINT,
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
