"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = await queryInterface.sequelize.query(
      "SELECT id from posts;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const tags = await queryInterface.sequelize.query(
      "SELECT id, name from tags;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const postTags = [];
    posts.forEach((post) => {
      // Mỗi post có 2-5 tags ngẫu nhiên
      const numTags = faker.number.int({ min: 2, max: 5 });
      const selectedTags = faker.helpers.arrayElements(tags, numTags);

      selectedTags.forEach((tag) => {
        postTags.push({
          post_id: post.id,
          tag_id: tag.id,
          created_at: faker.date.past(),
          updated_at: new Date(),
        });
      });
    });

    await queryInterface.bulkInsert("post_tag", postTags);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("post_tag", null, {});
  },
};
