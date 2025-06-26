const express = require("express");
const router = express.Router();

const postController = require("../controller/post.controller");
router.get("/", postController.getList);
router.get("/:id", postController.getOne);
router.post("/", postController.create);
router.put("/:id", postController.update);
router.patch("/:id", postController.update);
router.delete("/:id", postController.remove);

module.exports = router;
