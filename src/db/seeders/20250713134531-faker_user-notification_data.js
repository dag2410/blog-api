"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      "SELECT id from users;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const notifications = await queryInterface.sequelize.query(
      "SELECT id from notifications;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const userNotifications = [];

    for (let i = 0; i < 200; i++) {
      userNotifications.push({
        user_id: faker.helpers.arrayElement(users).id,
        notification_id: faker.helpers.arrayElement(notifications).id,
        read_at: faker.datatype.boolean() ? faker.date.past() : null,
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("user_notification", userNotifications);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_notification", null, {});
  },
};
