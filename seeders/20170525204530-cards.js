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
    var cards = [];
    cards.push(
      { listId: 1, title: "Card1", description: "This is a card 1" },
      { listId: 1, title: "Card2", description: "This is a card 2" }
    );
    return queryInterface.bulkInsert("Cards", cards);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Boards", null, {}, models.Card);
  }
};
