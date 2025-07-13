"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        type: Sequelize.INTEGER({
          unsigned: true,
        }),
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER({
          unsigned: true,
        }),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      thumbnail: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      cover: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        defaultValue: "draft",
      },
      meta_title: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      meta_description: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      visibility: {
        type: Sequelize.STRING(50),
        defaultValue: "public",
      },
      views_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      likes_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable("posts");
  },
};
