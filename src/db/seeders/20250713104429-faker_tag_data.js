"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const tags = [
      "javascript",
      "react",
      "nodejs",
      "python",
      "php",
      "java",
      "typescript",
      "vue",
      "angular",
      "laravel",
      "django",
      "express",
      "mongodb",
      "mysql",
      "postgresql",
      "redis",
      "docker",
      "kubernetes",
      "aws",
      "azure",
      "gcp",
      "tutorial",
      "guide",
      "tips",
      "tricks",
      "best-practices",
      "code-review",
      "performance",
      "security",
      "testing",
      "debugging",
    ];

    const tagData = tags.map((tag) => ({
      name: tag,
      created_at: faker.date.past(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("tags", tagData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
