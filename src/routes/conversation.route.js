const express = require("express");
const router = express.Router();
const chatController = require("@/controller/conversation.controller");
const checkAuth = require("@/middleware/checkAuth");
const attachResourceLoader = require("@/utils/attachResourceLoader");

attachResourceLoader(router, ["conversation"]);

router.post("/", checkAuth, chatController.createConversation);
router.get("/", checkAuth, chatController.getConversations);
router.get("/:conversation", checkAuth, chatController.getConversationById);
router.post("/:conversation/message", checkAuth, chatController.sendMessage);
router.put(
  "/:conversationId/message/read",
  checkAuth,
  chatController.markAsRead
);

module.exports = router;
