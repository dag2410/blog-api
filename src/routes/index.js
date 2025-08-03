const express = require("express");
const router = express.Router();

const commentRouter = require("@/routes/comment.route");
const postRouter = require("@/routes/post.route");
const authRouter = require("@/routes/auth.route");
const userRouter = require("@/routes/user.route");
const topicRouter = require("@/routes/topic.route");
const likesRouter = require("@/routes/like.route");
const bookmarkRouter = require("@/routes/bookmark.route");

router.use("/comments", commentRouter);
router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/topics", topicRouter);
router.use("/likes", likesRouter);
router.use("/bookmarks", bookmarkRouter);

module.exports = router;
