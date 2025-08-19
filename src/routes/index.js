const express = require("express");
const router = express.Router();
const commentRouter = require("@/routes/comment.route");
const postRouter = require("@/routes/post.route");
const authRouter = require("@/routes/auth.route");
const userRouter = require("@/routes/user.route");
const topicRouter = require("@/routes/topic.route");
const likesRouter = require("@/routes/like.route");
const bookmarkRouter = require("@/routes/bookmark.route");
const followRouter = require("@/routes/follow.route");
const settingRouter = require("@/routes/setting.route");
const uploadRouter = require("@/routes/upload.route");

router.use("/comments", commentRouter);
router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/topics", topicRouter);
router.use("/likes", likesRouter);
router.use("/bookmarks", bookmarkRouter);
router.use("/follows", followRouter);
router.use("/settings", settingRouter);
router.use("/upload", uploadRouter);

module.exports = router;
