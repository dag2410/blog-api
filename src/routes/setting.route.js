const express = require("express");
const checkAuth = require("@/middleware/checkAuth");
const settingController = require("@/controller/setting.controller");

const router = express.Router();

router.put("/change-password", checkAuth, settingController.changePassword);
router.put("/two-factor", checkAuth, settingController.toggleTwoFactor);

module.exports = router;
