module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN),
  REFRESH_TOKEN_EXPIRES_IN: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN),
  TOKEN_TYPE: process.env.TOKEN_TYPE,
};
