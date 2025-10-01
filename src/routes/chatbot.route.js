const express = require("express");
const router = express.Router();
const chatbotController = require("@/controller/chatbot.controller");
const checkAuth = require("@/middleware/checkAuth");

router.post("/", checkAuth, chatbotController.chatWithAI);
router.get("/history", checkAuth, chatbotController.getHistory);
module.exports = router;
