"use strict";
/** @type {import('sequelize-cli').Migration} */

const { faker } = require("@faker-js/faker");
module.exports = {
  async up(queryInterface, Sequelize) {
    const comments = [];
    for (let postId = 1; postId <= 50; postId++) {
      for (let i = 0; i < 2; i++) {
        comments.push({
          user_id: faker.number.int({ min: 1, max: 10 }),
          post_id: postId,
          content: faker.lorem.sentences(2),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert("comments", comments);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
