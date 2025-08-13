const { User, RefreshToken } = require("@/models");
const { hash } = require("@/utils/bcrypt");
const jwtService = require("@/service/jwt.service");
const refreshTokenService = require("@/service/refreshToken.service");
const queue = require("@/utils/queue");
const { verifyEmailToken } = require("@/service/jwt.service");
const { where } = require("sequelize");

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
    if (!user.verified_at) {
      throw new Error(
        "Tài khoản của bạn chưa được xác thực. Vui lòng kiểm tra email để xác thực."
      );
    }
    if (!user.username) {
      const base = user.last_name
        ? user.last_name.toLowerCase().replace(/\s+/g, "")
        : "user";

      let newUsername;
      let isTaken = true;

      while (isTaken) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        newUsername = `${base}${randomNum}`;

        const existing = await User.findOne({
          where: { username: newUsername },
        });
        if (!existing) {
          isTaken = false;
        }
      }

      await user.update({ username: newUsername });
    }
    const tokenData = jwtService.generateAccessToken(user.id);
    const refreshToken = await refreshTokenService.createRefreshToken(user.id);
    await User.update(
      {
        last_login: new Date(),
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    return {
      ...tokenData,
      refresh_token: refreshToken.token,
    };
  }

  async update(userId, data) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User không tồn tại.");
    await user.update(data);
    return user;
  }

  async logout(userId) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User không tồn tại.");
    await RefreshToken.destroy({
      where: {
        user_id: user.id,
      },
    });
    return { message: "Đăng xuất thành công." };
  }

  async forgotPassword(email) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error("Email không tồn tại.");
    queue.dispatch("sendVerifyEmailJob", {
      userId: user.id,
      type: "reset-password",
    });
  }

  async resetPassword(password, token) {
    const { userId } = verifyEmailToken(token);
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) throw new Error("Người dùng không tồn tại.");
    await User.update(
      {
        password: await hash(password),
      },
      {
        where: {
          id: user.id,
        },
      }
    );
  }

  async refreshAccessToken(refreshTokenString) {
    const refreshToken = await refreshTokenService.findValidRefreshToken(
      refreshTokenString
    );
    if (!refreshToken) throw new Error("Refresh token không hợp lệ.");
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

  async verifyEmail(token) {
    try {
      const verify = verifyEmailToken(token);
      const userId = verify.userId;
      await User.update(
        { verified_at: new Date() },
        {
          where: {
            id: userId,
          },
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new AuthService();
