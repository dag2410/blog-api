const express = require("express");
const postController = require("@/controller/post.controller");
const attachResourceLoader = require("@/utils/attachResourceLoader");

const router = express.Router();
attachResourceLoader(router, ["post"]);

router.get("/", postController.getList);
router.get("/:post", postController.getOne);
router.post("/", postController.create);
router.put("/:post", postController.update);
router.patch("/:post", postController.update);
router.delete("/:post", postController.remove);

module.exports = router;
