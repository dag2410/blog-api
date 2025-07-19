const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  TOKEN_TYPE,
  EMAIL_VERIFY_TOKEN_EXPIRES_IN,
  MAIL_JWT_TOKEN,
} = require("@/config/auth");

const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    userId,
    accessToken: token,
    token_type: TOKEN_TYPE,
    expiresIn: JWT_EXPIRES_IN,
  };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const generateEmailVerifyToken = (userId) => {
  return jwt.sign({ userId }, MAIL_JWT_TOKEN, {
    expiresIn: EMAIL_VERIFY_TOKEN_EXPIRES_IN,
  });
};

const verifyEmailToken = (token) => {
  return jwt.verify(token, MAIL_JWT_TOKEN);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateEmailVerifyToken,
  verifyEmailToken,
};
