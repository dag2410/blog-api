const authService = require("@/service/auth.service");
const usersService = require("@/service/auth.service");
const { success, error } = require("@/utils/response");

exports.me = async (req, res) => {
  try {
    success(res, 200, req.user);
  } catch (err) {
    error(res, 400, err.message);
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const tokenData = await usersService.register(
      email,
      password,
      first_name,
      last_name
    );
    success(res, 200, tokenData);
  } catch (err) {
    error(res, 401, err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tokenData = await usersService.login(email, password);
    success(res, 200, tokenData);
  } catch (err) {
    error(res, 401, err.message);
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const tokenData = await authService.refreshAccessToken(
      req.body.refresh_token
    );
    success(res, 200, tokenData);
  } catch (err) {
    error(res, 403, err.message);
  }
};

exports.forgotPassword = async (req, res) => {
  error(res, 501, "Chức năng chưa được hỗ trợ");
};

exports.resetPassword = async (req, res) => {
  error(res, 501, "Chức năng chưa được hỗ trợ");
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) error(res, 400, "Xác thực thất bại");
    await authService.verifyEmail(token);
    success(
      res,
      200,
      "Tài khoản của bạn đã được xác thực. Bạn có thể đăng nhập."
    );
  } catch (err) {
    error(res, 400, "Xác thực thất bại, bạn vui lòng thử lại.");
  }
};
