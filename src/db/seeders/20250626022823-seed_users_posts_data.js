"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users_posts = [];
    for (let postId = 1; postId < 200; postId++) {
      users_posts.push({
        user_id: faker.number.int({ min: 1, max: 10 }),
        post_id: postId,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("users_posts", users_posts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users_posts", null, {});
  },
};
