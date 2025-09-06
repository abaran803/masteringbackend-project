"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("recipeTags", {
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
      tag_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "tags",
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

    // Optional: prevent duplicate recipe-tag pairs
    await queryInterface.addConstraint("recipeTags", {
      fields: ["recipe_id", "tag_id"],
      type: "unique",
      name: "unique_recipe_tag",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("recipeTags");
  },
};
