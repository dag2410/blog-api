const express = require("express");
const router = express.Router();

const commentRouter = require("@/routes/comment.route");
const postRouter = require("@/routes/post.route");
const authRouter = require("@/routes/auth.route");
const userRouter = require("@/routes/user.route");
const topicRouter = require("@/routes/topic.route");

router.use("/comments", commentRouter);
router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/topics", topicRouter);

module.exports = router;
