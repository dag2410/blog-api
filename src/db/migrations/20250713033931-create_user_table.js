"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER({
          unsigned: true,
        }),
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
      },
      last_name: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      two_factor_enabled: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
      },
      two_factor_secret: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      avatar: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: true,
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      about: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      post_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      followers_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      following_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      likes_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      website_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      twitter_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      github_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      linkedin_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      email_send_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      verified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_login: {
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
    await queryInterface.dropTable("users");
  },
};
