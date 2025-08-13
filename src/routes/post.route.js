const express = require("express");
const postController = require("@/controller/post.controller");
const attachResourceLoader = require("@/utils/attachResourceLoader");
const checkAuth = require("@/middleware/checkAuth");

const router = express.Router();
attachResourceLoader(router, ["post"]);

router.get("/", postController.getList);
router.get("/featured", postController.getFeatured);
router.get("/recent", postController.getRecent);
router.get("/related", postController.getRelated);
router.get("/user/:userId", postController.getUserPosts);
router.get("/:post", postController.getOne);
router.post("/", checkAuth, postController.create);
router.put("/:post", postController.update);
router.patch("/:post", postController.update);
router.delete("/:post", postController.remove);

module.exports = router;
