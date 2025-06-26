const express = require("express");
const router = express.Router();

const commentRouter = require("./comment.route");
const postRouter = require("./post.route");
const userRouter = require("./user.route");
const topicRouter = require("./topic.route");

router.use("/comments", commentRouter);
router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/topics", topicRouter);

module.exports = router;
