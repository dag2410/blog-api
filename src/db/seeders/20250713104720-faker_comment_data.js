"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      "SELECT id from users;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const posts = await queryInterface.sequelize.query(
      "SELECT id from posts;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const comments = [];

    // Tạo comments gốc
    for (let i = 0; i < 100; i++) {
      comments.push({
        user_id: faker.helpers.arrayElement(users).id,
        post_id: faker.helpers.arrayElement(posts).id,
        content: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })),
        parent_id: null,
        likes_count: faker.number.int({ min: 0, max: 20 }),
        created_at: faker.date.past(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }

    await queryInterface.bulkInsert("comments", comments);

    // Lấy comments vừa tạo để tạo replies
    const createdComments = await queryInterface.sequelize.query(
      "SELECT id, post_id from comments WHERE parent_id IS NULL;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Tạo replies cho một số comments
    const replies = [];
    for (let i = 0; i < 50; i++) {
      const parentComment = faker.helpers.arrayElement(createdComments);
      replies.push({
        user_id: faker.helpers.arrayElement(users).id,
        post_id: parentComment.post_id,
        content: faker.lorem.paragraph(),
        parent_id: parentComment.id,
        likes_count: faker.number.int({ min: 0, max: 10 }),
        created_at: faker.date.past(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }

    await queryInterface.bulkInsert("comments", replies);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
