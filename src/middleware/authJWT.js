const { verifyToken } = require("../service/jwtService");
const { error } = require("../utils/response");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    error(res, 401, "Bạn chưa đăng nhập hoặc đăng kí");
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
  } catch (error) {
    error(res, 401, "Token không hợp lệ");
  } 
};
