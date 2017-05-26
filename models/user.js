"use strict";
const bcrypt = require("bcrypt");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // User.hasMany(models.UsersBoards, {
          //   foreignKey: "userId"
          // });
          User.belongsToMany(models.Board, {
            through: models.UsersBoards,
            as: "AddedBoard",
            foreignKey: "userId"
          });
          User.hasMany(models.Board, {
            foreignKey: "ownerId"
          });
          // User.hasMany(models.UsersCards, {
          //   foreignKey: "memberId"
          // });
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
  // User.beforeCreate((user, options) => {
  //   return bcrypt.hashSync(user.password, 8).then(hashedPw => {
  //     user.password = hashedPw;
  //   });
  // });
  return User;
};
