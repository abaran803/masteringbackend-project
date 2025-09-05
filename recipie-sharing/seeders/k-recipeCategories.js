"use strict";
const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = fs.readFileSync(
      path.join(__dirname, "..", "seed-data", "recipeCategories.json")
    );
    const stringified = data.toString();
    const parsed = JSON.parse(stringified);
    await queryInterface.bulkInsert("recipe_categories", parsed);
  },

  async down(queryInterface, Sequelize) {},
};
