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

    const comments = await queryInterface.sequelize.query(
      "SELECT id from comments;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const likes = [];

    // Likes cho posts
    for (let i = 0; i < 200; i++) {
      likes.push({
        user_id: faker.helpers.arrayElement(users).id,
        likeable_type: "Post",
        likeable_id: faker.helpers.arrayElement(posts).id,
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }

    // Likes cho comments
    for (let i = 0; i < 100; i++) {
      likes.push({
        user_id: faker.helpers.arrayElement(users).id,
        likeable_type: "Comment",
        likeable_id: faker.helpers.arrayElement(comments).id,
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("likes", likes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("likes", null, {});
  },
};
