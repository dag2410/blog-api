"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      "SELECT id from users;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const conversations = await queryInterface.sequelize.query(
      "SELECT id from conversations;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const userConversations = [];

    conversations.forEach((conversation) => {
      // Mỗi conversation có 2-5 users
      const numUsers = faker.number.int({ min: 2, max: 5 });
      const selectedUsers = faker.helpers.arrayElements(users, numUsers);

      selectedUsers.forEach((user) => {
        userConversations.push({
          user_id: user.id,
          conversation_id: conversation.id,
          created_at: faker.date.past(),
          updated_at: new Date(),
        });
      });
    });

    await queryInterface.bulkInsert("user_conversation", userConversations);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_conversation", null, {});
  },
};
