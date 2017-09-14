"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    var cards = [];
    var list = 0;
    for (let i = 0; i < 30; i++) {
      if (i % 5 === 0) {
        list += 1;
      }
      cards.push({
        title: `List ${i}`,
        description: "I'm just a list, yes I'm only a list.",
        listId: list,
        listIndex: i % 5,
        completed: false
      });
    }
    return queryInterface.bulkInsert("Cards", cards);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Cards", null, {});
  }
};
