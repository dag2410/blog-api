"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("notifications", "actor_id", {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      after: "title",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("notifications", "actor_id");
  },
};
