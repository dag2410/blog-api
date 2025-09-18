const express = require("express");
const router = express.Router();
const notificationController = require("@/controller/notification.controller");
const checkAuth = require("@/middleware/checkAuth");
const attachResourceLoader = require("@/utils/attachResourceLoader");

attachResourceLoader(router, ["notification"]);

router.get("/", checkAuth, notificationController.getAll);

router.post("/", checkAuth, notificationController.create);

router.delete("/:notification", checkAuth, notificationController.delete);

router.patch("/read", checkAuth, notificationController.markAsRead);

router.patch("/read-all", checkAuth, notificationController.markAllAsRead);

module.exports = router;
