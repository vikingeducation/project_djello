"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      passwordHash: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          User.hasMany(models.UsersBoards, {
            foreignKey: "userId"
          });
          User.belongsToMany(models.Board, {
            through: models.UsersBoards,
            as: "AddedBoard",
            foreignKey: "userId"
          });
          User.hasMany(models.Board, {
            foreignKey: "ownerId"
          });
          User.hasMany(models.UsersCards, {
            foreignKey: "memberId"
          });
          User.belongsToMany(models.Card, {
            through: models.UsersCards,
            as: "MembersCard",
            foreignKey: "memberId"
          });
          User.hasMany(models.Activity, {
            foreignKey: "authorId"
          });
        }
      }
    }
  );
  return User;
};
