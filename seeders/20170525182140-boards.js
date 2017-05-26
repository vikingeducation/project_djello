"use strict";
const models = require("./../models");

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var boards = [];
    boards.push(
      { id: 1, name: "Board1", ownerId: 1 },
      { id: 2, name: "Board2", ownerId: 1 }
    );
    return queryInterface.bulkInsert("Boards", boards);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Boards", null, {}, models.Board);
  }
};
