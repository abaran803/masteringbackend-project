"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface
      .removeColumn("categories", "email")
      .then(() => queryInterface.removeColumn("categories", "password"))
      .then(() => queryInterface.removeColumn("categories", "isVerified"))
      .then(() => queryInterface.addColumn("categories", "name"), {
        type: DataTypes.STRING,
      })
      .then(() =>
        queryInterface.addColumn("categories", "type", {
          type: DataTypes.STRING,
        })
      );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
