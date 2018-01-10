'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserToBoardJoin = sequelize.define('UserToBoardJoin', {
    board: DataTypes.ID
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserToBoardJoin;
};