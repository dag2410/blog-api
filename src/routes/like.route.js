const express = require("express");
const router = express.Router();
const likeController = require("@/controller/like.controller");
const checkAuth = require("@/middleware/checkAuth");

router.post("/", checkAuth, likeController.toggleLike);

module.exports = router;
