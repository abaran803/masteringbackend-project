"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("recipes", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      instruction: {
        type: Sequelize.TEXT,
      },
      photos: {
        type: Sequelize.ARRAY(Sequelize.STRING), // works in Postgres
        // ⚠️ If you're using MySQL, ARRAY is not supported → you'd need JSON instead
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users", // link to users table
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable("recipes");
  },
};
