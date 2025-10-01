const accountAgent = require("@/agents/acountAgent");
const commentAgent = require("@/agents/commentAgent");
const defaultAgent = require("@/agents/defaultAgent");
const postAgent = require("@/agents/postAgent");
const profileAgent = require("@/agents/profileAgent");
const { Chatbot } = require("@/models");
const intentClassifier = require("@/utils/intentClassifier");
const { send } = require("@/utils/openai");

class ChatbotService {
  async createAIChat(userId, role = "user", content) {
    const userMsg = await Chatbot.create({
      user_id: userId,
      role,
      content,
    });

    const history = await Chatbot.findAll({
      where: {
        user_id: userId,
      },
      order: [["created_at", "ASC"]],
    });

    const agent = await intentClassifier(
      history
        .filter((m) => m.role === "user")
        .slice(-5)
        .map((m) => ({ role: "user", content: m.content }))
    );

    let agentModule;
    switch (agent) {
      case "accountAgent":
        agentModule = accountAgent;
        break;
      case "commentAgent":
        agentModule = commentAgent;
        break;
      case "postAgent":
        agentModule = postAgent;
        break;
      case "profileAgent":
        agentModule = profileAgent;
        break;
      default:
        agentModule = defaultAgent;
        break;
    }

    const reply = await send({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: agentModule.systemPrompt },
        ...history.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
    });

    const assistantMsg = await Chatbot.create({
      user_id: userId,
      role: "assistant",
      content: reply,
    });

    return { user: userMsg, assistant: assistantMsg };
  }

  async getAIChat(userId) {
    let chats = await Chatbot.findAll({
      where: { user_id: userId },
      order: [["created_at", "ASC"]],
    });

    if (!chats || chats.length === 0) {
      const welcome = await Chatbot.create({
        user_id: userId,
        role: "assistant",
        content:
          "Xin chào. Mình là trợ lí AI của Hải Đăng Blog. Bạn cần hỗ trợ gì hôm nay?",
      });
      chats = [welcome];
    }
    return chats;
  }
}

module.exports = new ChatbotService();
