"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ratings", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      rating: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      recipe_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "recipes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Optional: prevent duplicate ratings by the same user on the same recipe
    await queryInterface.addConstraint("ratings", {
      fields: ["user_id", "recipe_id"],
      type: "unique",
      name: "unique_user_recipe_rating",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("ratings");
  },
};
