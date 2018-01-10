'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teams = sequelize.define('Teams', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Teams;
};