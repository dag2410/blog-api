const express = require("express");
const topicController = require("@/controller/topic.controller");
const attachResourceLoader = require("@/utils/attachResourceLoader");

const router = express.Router();
attachResourceLoader(router, ["topic"]);

router.get("/", topicController.getList);
router.get("/:topic", topicController.getOne);
router.post("/", topicController.create);
router.put("/:topic", topicController.update);
router.patch("/:topic", topicController.update);
router.delete("/:topic", topicController.remove);

module.exports = router;
