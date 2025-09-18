const conversationService = require("@/service/conversation.service");
const { success, error } = require("@/utils/response");

exports.createConversation = async (req, res) => {
  try {
    const { participantIds, name, avatar } = req.body;
    const userId = req.user.id;

    const conversation = await conversationService.createConversation(
      userId,
      participantIds,
      name,
      avatar
    );

    success(res, 201, conversation);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await conversationService.getConversations(userId);
    success(res, 200, conversations);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.getConversationById = async (req, res) => {
  try {
    const { conversation } = req.params;
    const userId = req.user.id;
    const result = await conversationService.getById(conversation, userId);

    if (!conversation) {
      error(res, 404, "Conversation not found");
    }

    success(res, 200, result);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversation } = req.params;
    const { content, type } = req.body;
    const userId = req.user.id;
    const message = await conversationService.sendMessage(
      userId,
      conversation,
      content,
      type
    );

    success(res, 201, message);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    const updateMessages = await conversationService.markAsRead(
      userId,
      conversationId
    );

    if (!updateMessages) error(res, 404, "Message not found or not authorized");

    success(res, 200, updateMessages);
  } catch (err) {
    error(res, 500, err.message);
  }
};
