"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("recipeIngredients", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
      ingredient_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "ingredients",
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

    // Optionally, add a unique constraint to prevent duplicate recipe-ingredient pairs
    await queryInterface.addConstraint("recipeIngredients", {
      fields: ["recipe_id", "ingredient_id"],
      type: "unique",
      name: "unique_recipe_ingredient",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("recipeIngredients");
  },
};
