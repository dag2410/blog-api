"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const conversations = [];

    for (let i = 0; i < 15; i++) {
      conversations.push({
        name: faker.lorem.words(3),
        avatar: faker.image.avatar(),
        last_message_at: faker.date.recent(),
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("conversations", conversations);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("conversations", null, {});
  },
};
