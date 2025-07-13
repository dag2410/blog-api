"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get user IDs
    const users = await queryInterface.sequelize.query(
      "SELECT id from users;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const posts = [];
    for (let i = 0; i < 50; i++) {
      const title = faker.lorem.sentence();
      posts.push({
        user_id: faker.helpers.arrayElement(users).id,
        title: title,
        slug: title
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .substring(0, 100),
        thumbnail: faker.image.url(),
        cover: faker.image.url(),
        description: faker.lorem.paragraph(),
        content: faker.lorem.paragraphs(5, "<br/>"),
        status: faker.helpers.arrayElement(["draft", "published", "archived"]),
        meta_title: title,
        meta_description: faker.lorem.sentence(),
        visibility: faker.helpers.arrayElement([
          "public",
          "private",
          "unlisted",
        ]),
        views_count: faker.number.int({ min: 0, max: 1000 }),
        likes_count: faker.number.int({ min: 0, max: 100 }),
        published_at: faker.date.past(),
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("posts", posts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
