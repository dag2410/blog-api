"use strict";

/** @type {import('sequelize-cli').Migration} */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("conversations", "name", {
      type: Sequelize.STRING(50),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("conversations", "name", {
      type: Sequelize.STRING(50),
      allowNull: false,
    });
  },
};
