const pusher = require("@/config/pusher");
const { Conversation, Message, User, sequelize } = require("@/models");
const { Op, Sequelize } = require("sequelize");

class conversationService {
  async createConversation(userId, participantIds, name = null, avatar = null) {
    let existedConv = null;

    if (!name && participantIds.length === 1) {
      const otherUserId = participantIds[0];

      existedConv = await Conversation.findOne({
        where: {
          id: {
            [Op.in]: Sequelize.literal(`
        (SELECT conversation_id
         FROM user_conversation
         WHERE user_id IN (${userId}, ${otherUserId})
         GROUP BY conversation_id
         HAVING COUNT(DISTINCT user_id) = 2)
      `),
          },
        },
        include: [
          {
            model: User,
            as: "users",
            attributes: ["id", "username", "avatar"],
            through: { attributes: [] },
          },
        ],
      });
    }

    if (existedConv) {
      return existedConv;
    }

    const conversation = await Conversation.create({ name, avatar });

    const allParticipants = [...new Set([userId, ...participantIds])];
    await conversation.addUsers(allParticipants);

    const fullConversation = await Conversation.findByPk(conversation.id, {
      include: [
        { model: User, as: "users", attributes: ["id", "username", "avatar"] },
      ],
    });

    return fullConversation;
  }

  async getConversations(userId) {
    return await Conversation.findAll({
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "username", "avatar"],
          through: { attributes: [] },
        },
        {
          model: Message,
          as: "messages",
          separate: true,
          limit: 1,
          order: [["created_at", "DESC"]],
        },
      ],
      where: {
        id: {
          [Op.in]: Sequelize.literal(
            `(SELECT conversation_id FROM user_conversation WHERE user_id = ${userId})`
          ),
        },
      },
      order: [["last_message_at", "DESC"]],
      distinct: true,
    });
  }

  async getById(id, userId) {
    const conversation = await Conversation.findByPk(id, {
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "username", "avatar"],
          through: { attributes: [] },
        },
        {
          model: Message,
          as: "messages",
          include: [
            {
              model: User,
              as: "sender",
              attributes: ["id", "username", "avatar"],
            },
          ],
        },
      ],
      order: [[{ model: Message, as: "messages" }, "created_at", "ASC"]],
    });

    if (!conversation) return null;
    return conversation;
  }

  async sendMessage(userId, conversationId, content, type = "text") {
    const message = await Message.create({
      user_id: userId,
      conversation_id: +conversationId,
      content,
      type,
    });

    await Conversation.update(
      {
        last_message_at: new Date(),
      },
      {
        where: { id: +conversationId },
      }
    );

    const fullMessage = await Message.findByPk(message.id, {
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "username", "avatar"],
        },
      ],
    });

    await pusher.trigger(`conversation-${+conversationId}`, "new-message", {
      message: fullMessage,
    });

    return fullMessage;
  }

  async markAsRead(userId, conversationId) {
    const conv = await Conversation.findByPk(conversationId, {
      include: [
        {
          model: User,
          as: "users",
          where: { id: userId },
        },
      ],
    });

    if (!conv) return null;

    await Message.update(
      { read_at: new Date() },
      {
        where: {
          conversation_id: conversationId,
          user_id: { [Op.ne]: userId },
          read_at: null,
        },
      }
    );

    const updatedMessages = await Message.findAll({
      where: { conversation_id: conversationId },
    });

    await pusher.trigger(`conversation-${conversationId}`, "read-message", {
      conversation_id: conversationId,
      user_id: userId,
    });

    return updatedMessages;
  }
}

module.exports = new conversationService();
