'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserToTeamJoin = sequelize.define('UserToTeamJoin', {
    team: DataTypes.ID
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserToTeamJoin;
};