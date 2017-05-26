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
    var usersboards = [];
    usersboards.push({ id: 1, userId: 2, boardId: 1 });
    return queryInterface.bulkInsert("UsersBoards", usersboards);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete(
      "UsersBoards",
      null,
      {},
      models.UsersBoards
    );
  }
};
