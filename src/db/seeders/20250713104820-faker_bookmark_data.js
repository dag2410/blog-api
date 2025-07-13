"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      "SELECT id from users;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const posts = await queryInterface.sequelize.query(
      "SELECT id from posts;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const bookmarks = [];

    for (let i = 0; i < 80; i++) {
      bookmarks.push({
        user_id: faker.helpers.arrayElement(users).id,
        post_id: faker.helpers.arrayElement(posts).id,
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("bookmarks", bookmarks);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bookmarks", null, {});
  },
};
