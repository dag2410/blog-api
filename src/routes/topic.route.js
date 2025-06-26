const express = require("express");
const topicController = require("../controller/topic.controller");

const router = express.Router();

router.get("/", topicController.getList);
router.get("/:id", topicController.getOne);
router.post("/", topicController.create);
router.put("/:id", topicController.update);
router.patch("/:id", topicController.update);
router.delete("/:id", topicController.remove);

module.exports = router;
