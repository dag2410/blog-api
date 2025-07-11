const express = require("express");
const router = express.Router();

const commentRouter = require("./comment.route");
const postRouter = require("./post.route");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const topicRouter = require("./topic.route");

router.use("/comments", commentRouter);
router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/topics", topicRouter);

module.exports = router;
