const express = require("express");
const authController = require("@/controller/auth.controller");
const checkAuth = require("@/middleware/checkAuth");
const {
  registerValidator,
  loginValidator,
  resetPasswordValidator,
  forgotPasswordValidator,
} = require("@/validators/auth.validator");
const router = express.Router();

router.get("/profile", checkAuth, authController.me);
router.get("/verify-email", authController.verifyEmail);
router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);
router.post("/refresh", authController.refreshToken);
router.post(
  "/reset-password",
  resetPasswordValidator,
  authController.resetPassword
);
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  authController.forgotPassword
);

module.exports = router;
