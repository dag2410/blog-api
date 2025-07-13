"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = await queryInterface.sequelize.query(
      "SELECT id from posts;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const topics = await queryInterface.sequelize.query(
      "SELECT id from topics;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const topicsPosts = [];
    posts.forEach((post) => {
      // Mỗi post thuộc về 1-3 topics ngẫu nhiên
      const numTopics = faker.number.int({ min: 1, max: 3 });
      const selectedTopics = faker.helpers.arrayElements(topics, numTopics);

      selectedTopics.forEach((topic) => {
        topicsPosts.push({
          post_id: post.id,
          topic_id: topic.id,
        });
      });
    });

    await queryInterface.bulkInsert("topics_posts", topicsPosts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topics_posts", null, {});
  },
};
