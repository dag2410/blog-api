"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const topics = [
      "Technology",
      "Programming",
      "Web Development",
      "Mobile Development",
      "UI/UX Design",
      "Graphic Design",
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "Cybersecurity",
      "Cloud Computing",
      "DevOps",
      "Blockchain",
      "Internet of Things",
      "Augmented Reality",
      "Digital Marketing",
      "E-commerce",
      "Startup & Innovation",
      "Software Engineering",
      "Product Management",
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
