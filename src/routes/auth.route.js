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
router.post("/logout", checkAuth, authController.logout);
router.post("/refresh", authController.refreshToken);

router.post(
  "/forgot-password",
  forgotPasswordValidator,
  authController.forgotPassword
);

router.get("/reset-password", authController.verifyEmail);

router.post(
  "/reset-password",
  resetPasswordValidator,
  authController.resetPassword
);

module.exports = router;
