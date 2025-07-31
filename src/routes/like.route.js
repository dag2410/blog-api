const express = require("express");
const router = express.Router();
const likeController = require("@/controller/like.controller");
const checkAuth = require("@/middleware/checkAuth");

router.post("/", checkAuth, likeController.like);
router.delete("/", checkAuth, likeController.unlike);

module.exports = router;
