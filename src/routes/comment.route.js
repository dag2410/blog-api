const express = require("express");
const commentsController = require("../controller/comment.controller");

const router = express.Router();

router.get("/", commentsController.getList);
router.get("/:id", commentsController.getOne);
router.post("/", commentsController.create);
router.put("/:id", commentsController.update);
router.patch("/:id", commentsController.update);
router.delete("/:id", commentsController.remove);

module.exports = router;
