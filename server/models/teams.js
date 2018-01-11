"use strict";
module.exports = (sequelize, DataTypes) => {
  var Teams = sequelize.define("Teams", {
    name: DataTypes.STRING
  });

  Team.associate = function(models) {
    Team.hasMany(models.UserToTeamJoin, {
      foreignKey: "teamid"
    });

    Team.belongsToMany(models.User, {
      through: models.UserToTeamJoin,
      as: "TeamId",
      foreignKey: "teamid"
    });
  };
  return Teams;
};
