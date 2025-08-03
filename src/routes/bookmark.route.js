const express = require("express");
const router = express.Router();
const bookmarkController = require("@/controller/bookmark.controller");
const checkAuth = require("@/middleware/checkAuth");

router.post("/", checkAuth, bookmarkController.toggleBookmark);
router.get("/", checkAuth, bookmarkController.getByUser);
router.delete("/", checkAuth, bookmarkController.deleteBookmarks);

module.exports = router;
