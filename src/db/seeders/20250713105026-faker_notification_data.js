"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const notifications = [];

    for (let i = 0; i < 100; i++) {
      notifications.push({
        type: faker.helpers.arrayElement([
          "like",
          "comment",
          "follow",
          "mention",
        ]),
        title: faker.lorem.sentence(),
        notifiable_type: faker.helpers.arrayElement([
          "Post",
          "Comment",
          "User",
        ]),
        notifiable_id: faker.number.int({ min: 1, max: 50 }),
        created_at: faker.date.past(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }

    await queryInterface.bulkInsert("notifications", notifications);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("notifications", null, {});
  },
};
