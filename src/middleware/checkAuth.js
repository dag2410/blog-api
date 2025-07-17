const { error } = require("@/utils/response");
const { User } = require("@/models");
const jwtService = require("@/service/jwt.service");

async function checkAuth(req, res, next) {
  try {
    const token = req.headers?.authorization?.replace("Bearer ", "");
    if (!token) {
      error(res, 401, "Token không được cung cấp");
    }
    const payload = jwtService.verifyAccessToken(token);
    const user = await User.findOne({
      attributes: ["id", "email", "created_at"],
      where: { id: payload.userId },
    });
    if (!user) {
      error(res, 401, "User không tồn tại");
    }
    req.user = user;
    next();
  } catch (err) {
    error(res, 401, "Token không hợp lệ");
  }
}

module.exports = checkAuth;
