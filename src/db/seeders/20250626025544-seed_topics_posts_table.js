"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const topics_posts = [];
    for (let postId = 1; postId < 100; postId++) {
      topics_posts.push({
        topic_id: faker.number.int({ min: 1, max: 5 }),
        post_id: postId,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("topics_posts", topics_posts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topics_posts", null, {});
  },
};
