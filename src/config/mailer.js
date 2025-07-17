const nodemailer = require("nodemailer");
const {
  MAIL_SERVICE,
  MAIL_AUTH_USER,
  MAIL_AUTH_PASS,
} = require("@/config/auth");

const transporter = nodemailer.createTransport({
  service: MAIL_SERVICE,
  auth: {
    user: MAIL_AUTH_USER,
    pass: MAIL_AUTH_PASS,
  },
});

module.exports = transporter;
