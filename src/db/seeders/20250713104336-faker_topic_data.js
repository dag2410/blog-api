"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const topics = [
      "Technology",
      "Programming",
      "Web Development",
      "Mobile Development",
      "Design",
      "UI/UX",
      "Marketing",
      "Business",
      "Startup",
      "AI/ML",
      "Data Science",
      "DevOps",
      "Cloud Computing",
      "Cybersecurity",
      "Blockchain",
    ];

    const topicData = topics.map((topic) => ({
      name: topic,
      slug: topic.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      title: `${topic} - Tất cả về ${topic}`,
      image: faker.image.url(),
      description: faker.lorem.paragraph(),
      posts_count: faker.number.int({ min: 0, max: 50 }),
      created_at: faker.date.past(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("topics", topicData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topics", null, {});
  },
};
