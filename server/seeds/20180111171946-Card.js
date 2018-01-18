"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
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
    for (let i = 1; i <= 10; i++) {
      cards.push({
        name: `Foo${i}'s First Card`,
        body: `Foo${i}'s First Card Body`,
        listId: i
      });
    }
    return queryInterface.bulkInsert("Cards", cards);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
