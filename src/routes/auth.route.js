const express = require("express");
const authController = require("../controller/auth.controller");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.get("/profile", checkAuth, authController.me);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.post("/reset-password", authController.resetPassword);
router.post("/forgot-password", authController.forgotPassword);

module.exports = router;
