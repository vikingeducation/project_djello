"use strict";
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define("List", {
    name: DataTypes.STRING
  });

  List.associate = function(models) {
    List.belongsTo(models.Board, {
      foreignKey: "boardid"
    });
  };

  List.associate = function(models) {
    List.hasMany(models.Card, {
      foreignKey: "listid"
    });
  };

  return List;
};
