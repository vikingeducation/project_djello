"use strict";
module.exports = (sequelize, DataTypes) => {
  var UserToTeamJoin = sequelize.define("UserToTeamJoin", {
    team: DataTypes.ID
  });

  UserToTeamJoin.associate = function(models) {
    UserToTeamJoin.belongsTo(models.Team, {
      foreignKey: "teamid"
    });

    UserToTeamJoin.belongsTo(models.User, {
      foreignKey: "userid"
    });
  };

  return UserToTeamJoin;
};
