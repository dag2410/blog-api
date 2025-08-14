const ms = require("ms");

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN: ms(process.env.REFRESH_TOKEN_EXPIRES_IN || "30d"),
  TOKEN_TYPE: process.env.TOKEN_TYPE,
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_SENDER_FROM: process.env.MAIL_SENDER_FROM,
  MAIL_AUTH_PASS: process.env.MAIL_AUTH_PASS,
  MAIL_AUTH_USER: process.env.MAIL_AUTH_USER,
  MAIL_JWT_TOKEN: process.env.MAIL_JWT_TOKEN,
  APP_URL: process.env.APP_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  EMAIL_VERIFY_TOKEN_EXPIRES_IN: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN,
};
