"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("topics_posts", {
      id: {
        type: Sequelize.INTEGER({
          unsigned: true,
        }),
        autoIncrement: true,
        primaryKey: true,
      },
      post_id: {
        type: Sequelize.INTEGER({
          unsigned: true,
        }),
        allowNull: false,
        references: {
          model: "posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      topic_id: {
        type: Sequelize.INTEGER({
          unsigned: true,
        }),
        allowNull: false,
        references: {
          model: "topics",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("topics_posts");
  },
};
