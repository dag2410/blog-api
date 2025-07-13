"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      "SELECT id from users;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const userSettings = users.map((user) => ({
      user_id: user.id,
      data: JSON.stringify({
        notifications: {
          email: faker.datatype.boolean(),
          push: faker.datatype.boolean(),
          sms: faker.datatype.boolean(),
        },
        privacy: {
          profile_visibility: faker.helpers.arrayElement([
            "public",
            "private",
            "friends",
          ]),
          show_email: faker.datatype.boolean(),
          show_activity: faker.datatype.boolean(),
        },
        preferences: {
          theme: faker.helpers.arrayElement(["light", "dark", "auto"]),
          language: faker.helpers.arrayElement(["vi", "en", "ja"]),
          timezone: faker.location.timeZone(),
        },
      }),
      created_at: faker.date.past(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("user_settings", userSettings);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_settings", null, {});
  },
};
