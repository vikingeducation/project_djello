"use strict";
module.exports = function(sequelize, DataTypes) {
  var Board = sequelize.define(
    "Board",
    {
      name: DataTypes.STRING,
      ownerId: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          Board.hasMany(models.UsersBoards, {
            foreignKey: "boardId"
          });
          Board.belongsToMany(models.User, {
            through: models.UsersBoards,
            unique: false,
            as: "MemberOfBoard",
            constraints: false,
            foreignKey: "boardId"
          });
          Board.belongsTo(models.User, {
            foreignKey: "ownerId",
            as: "Owner"
          });
          Board.hasMany(models.List, { foreignKey: "boardId" });
        }
      }
    }
  );
  return Board;
};
