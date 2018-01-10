'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserToCardJoin = sequelize.define('UserToCardJoin', {
    card: DataTypes.ID
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserToCardJoin;
};