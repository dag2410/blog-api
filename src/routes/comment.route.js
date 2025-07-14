const express = require("express");
const commentsController = require("@/controller/comment.controller");
const attachResourceLoader = require("@/utils/attachResourceLoader");

const router = express.Router();
attachResourceLoader(router, ["comment"]);

router.get("/", commentsController.getList);
router.get("/:comment", commentsController.getOne);
router.post("/", commentsController.create);
router.put("/:comment", commentsController.update);
router.patch("/:comment", commentsController.update);
router.delete("/:comment", commentsController.remove);

module.exports = router;
