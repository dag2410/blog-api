"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      "SELECT id from users;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const follows = [];
    users.forEach((user) => {
      // Mỗi user follow 3-7 users khác ngẫu nhiên
      const numFollows = faker.number.int({ min: 3, max: 7 });
      const otherUsers = users.filter((u) => u.id !== user.id);
      const selectedUsers = faker.helpers.arrayElements(otherUsers, numFollows);

      selectedUsers.forEach((followedUser) => {
        follows.push({
          following_id: user.id,
          followed_id: followedUser.id,
          created_at: faker.date.past(),
          updated_at: new Date(),
        });
      });
    });

    await queryInterface.bulkInsert("follows", follows);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("follows", null, {});
  },
};
