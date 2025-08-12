const express = require("express");
const router = express.Router();
const followController = require("@/controller/follow.controller");
const checkAuth = require("@/middleware/checkAuth");

router.post("/", checkAuth, followController.toggleFollow);
router.get("/following/:userId", followController.getFollowing);
router.get("/followers/:userId", followController.getFollowers);

module.exports = router;
