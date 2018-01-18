"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        //validate: {isAlpha: true}
      },
      lastName: {
        type: Sequelize.STRING,
        //validate: {isAlpha: true}
      },
      email: {
        type: Sequelize.STRING,
        validate: {isEmail: true}
      },
      accessToken: {
        type: Sequelize.STRING,
        validate: {isNull: true}
      },
      password: {
        type: Sequelize.STRING,
        validate: {isNull: true}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
