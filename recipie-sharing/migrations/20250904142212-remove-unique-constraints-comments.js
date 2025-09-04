"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "comments",
      "comments_user_id_recipe_id_key"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint("comments", {
      fields: ["user_id", "recipe_id"],
      type: "unique",
      name: "comments_user_id_recipe_id_key",
    });
  },
};
