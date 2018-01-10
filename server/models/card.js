"use strict";
module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define("Card", {
    name: DataTypes.STRING
  });

  Card.associate = function(models) {
    Card.belongsTo(models.List, {
      foreignKey: "listid"
    });
  };

  Card.associate = function(models) {
    Card.hasMany(models.Activity, {
      foreignKey: "cardid"
    });
  };

  return Card;
};
