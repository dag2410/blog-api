"use strict";
/** @type {import('sequelize-cli').Migration} */

const { faker } = require("@faker-js/faker");
module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = [];
    for (let topicId = 1; topicId <= 5; topicId++) {
      for (let i = 0; i < 50; i++) {
        posts.push({
          title: faker.lorem.sentence(),
          slug: faker.helpers.slugify(faker.lorem.slug()) + "-" + Date.now(),
          summary: faker.lorem.sentences(2),
          content: faker.lorem.paragraphs(10),
          published_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert("posts", posts);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
