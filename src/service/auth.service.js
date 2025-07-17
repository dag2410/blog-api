const { User } = require("@/models");
const { hash, compare } = require("@/utils/bcrypt");
const jwtService = require("@/service/jwt.service");
const refreshTokenService = require("@/service/refreshToken.service");
const queue = require("@/utils/queue");

class AuthService {
  async register(email, password, firstName, lastName) {
    const user = await User.create({
      email,
      password: await hash(password),
      first_name: firstName,
      last_name: lastName,
    });
    queue.dispatch("sendVerifyEmailJob", {
      userId: user.id,
      type: "verify-email",
    });
    return jwtService.generateAccessToken(user.id);
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    const tokenData = jwtService.generateAccessToken(user.id);
    const refreshToken = await refreshTokenService.createRefreshToken(user.id);
    return {
      ...tokenData,
      refresh_token: refreshToken.token,
    };
  }

  async update(userId, data) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User không tồn tại");
    await user.update(data);
    return user;
  }

  async refreshAccessToken(refreshTokenString) {
    const refreshToken = await refreshTokenService.findValidRefreshToken(
      refreshTokenString
    );
    if (!refreshToken) throw new Error("Refresh token không hợp lệ");
    const tokenData = jwtService.generateAccessToken(refreshToken.user_id);
    await refreshTokenService.deleteRefreshToken(refreshToken);
    const newRefreshToken = await refreshTokenService.createRefreshToken(
      refreshToken.user_id
    );

    return {
      ...tokenData,
      refresh_token: newRefreshToken.token,
    };
  }
}

module.exports = new AuthService();
