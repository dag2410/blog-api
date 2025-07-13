"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const userConversations = await queryInterface.sequelize.query(
      "SELECT user_id, conversation_id from user_conversation;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const messages = [];

    for (let i = 0; i < 300; i++) {
      const userConversation = faker.helpers.arrayElement(userConversations);
      messages.push({
        user_id: userConversation.user_id,
        conversation_id: userConversation.conversation_id,
        type: faker.helpers.arrayElement(["text", "image", "file"]),
        content: faker.lorem.sentence(),
        delete_at: null,
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("messages", messages);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("messages", null, {});
  },
};
