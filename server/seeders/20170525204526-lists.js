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
    var lists = [];
    lists.push(
      {
        boardId: 1,
        title: "List1",
        description: "This is a description of list 1"
      },
      {
        boardId: 1,
        title: "List2",
        description: "This is a description of list 2"
      }
    );
    return queryInterface.bulkInsert("Lists", lists);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Boards", null, {}, models.List);
  }
};
