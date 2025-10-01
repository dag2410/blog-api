const { error, success } = require("@/utils/response");
const chatbotService = require("@/service/chatbot.service");

exports.chatWithAI = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { content, role } = req.body;
    if (!userId || !content) {
      error(res, 400, "User id và content là bắt buộc");
    }
    const chat = await chatbotService.createAIChat(userId, role, content);
    success(res, 200, chat);
  } catch (error) {
    next(error);
  }
};
exports.getHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const chats = await chatbotService.getAIChat(userId);
    success(res, 200, chats);
  } catch (error) {
    next(error);
  }
};
