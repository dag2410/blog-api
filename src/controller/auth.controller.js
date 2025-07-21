const authService = require("@/service/auth.service");
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
    const tokenData = await authService.register(
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
    const tokenData = await authService.login(email, password);
    res.cookie("refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    const { refresh_token, ...data } = tokenData;
    success(res, 200, data);
  } catch (err) {
    error(res, 401, "Đăng nhập thất bại.");
  }
};

exports.logout = async (req, res) => {
  try {
    const result = await authService.logout(req.user.id);
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    success(res, 200, result);
  } catch (err) {
    error(res, 401, err.message);
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshTokenFromCookie = req.cookies?.refresh_token;
    if (!refreshTokenFromCookie) {
      return error(res, 401, "Không tìm thấy refresh token.");
    }
    const tokenData = await authService.refreshAccessToken(
      refreshTokenFromCookie
    );
    res.cookie("refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    const { refresh_token, ...data } = tokenData;

    success(res, 200, data);
  } catch (err) {
    error(res, 403, err.message);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    success(res, 200, "Một liên kết đặt lại mật khẩu đã được gửi vào gmail");
  } catch (err) {
    error(res, 400, err.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    const { password } = req.body;
    await authService.resetPassword(password, token);
    success(res, 200, "Đặt lại mật khẩu thành công");
  } catch (err) {
    error(res, 401, err.message);
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) error(res, 400, "Xác thực thất bại");
    await authService.verifyEmail(token);
    success(res, 200, "Tài khoản của bạn đã được xác thực.");
  } catch (err) {
    error(res, 400, "Xác thực thất bại, bạn vui lòng thử lại.");
  }
};
