"use strict";
const models = require("./../models");
const bcrypt = require("bcrypt");

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
    var users = [];
    users.push(
      {
        email: "egle@gmail.com",
        password: bcrypt.hashSync("123456", 8)
      },
      { email: "test@gmail.com", password: bcrypt.hashSync("123456", 8) },
      { email: "test1@gmail.com", password: bcrypt.hashSync("123456", 8) }
    );

    return queryInterface.bulkInsert("Users", users);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Users", null, {}, models.User);
  }
};
