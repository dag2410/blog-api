const generateToken = require("@/utils/generateToken");
const { RefreshToken } = require("@/models");
const { REFRESH_TOKEN_EXPIRES_IN } = require("@/config/auth");
const { Op } = require("sequelize");

const generateUniqueToken = async () => {
  let randToken = null;
  do {
    randToken = generateToken();
  } while (
    await RefreshToken.findOne({
      where: {
        token: randToken,
      },
    })
  );
  return randToken;
};

const createRefreshToken = async (userId) => {
  const token = await generateUniqueToken();
  const current = new Date();
  const expiredAt = new Date(
    current.getTime() + REFRESH_TOKEN_EXPIRES_IN * 1000
  );
  return await RefreshToken.create({
    user_id: userId,
    token: token,
    expired_at: expiredAt,
  });
};

const findValidRefreshToken = async (token) => {
  return await RefreshToken.findOne({
    where: {
      token: token,
      expired_at: {
        [Op.gte]: new Date(),
      },
    },
  });
};

const deleteRefreshToken = async (refreshToken) => {
  await refreshToken.destroy();
};
module.exports = {
  generateUniqueToken,
  createRefreshToken,
  findValidRefreshToken,
  deleteRefreshToken,
};
