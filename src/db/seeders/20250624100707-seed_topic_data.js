"use strict";
/** @type {import('sequelize-cli').Migration} */

const { faker } = require("@faker-js/faker");
module.exports = {
  async up(queryInterface, Sequelize) {
    const topics = [];
    for (let i = 0; i < 5; i++) {
      topics.push({
        title: faker.lorem.words(3),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("topics", topics);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("topics", null, {});
  },
};
