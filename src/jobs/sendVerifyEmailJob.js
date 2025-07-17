const userService = require("@/service/user.service");
const { generateAccessToken } = require("@/service/jwt.service");
const { JWT_EXPIRES_IN, APP_URL, MAIL_SENDER_FROM } = require("@/config/auth");
const loadEmail = require("@/utils/loadEmail");
const transporter = require("@/config/mailer");

async function sendVerifyEmailJob(job) {
  const { userId, type } = JSON.parse(job.payload);
  const user = await userService.getById(userId);
  const token = generateAccessToken(
    {
      userId: user?.id,
    },
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
  const baseUrl = APP_URL;
  const allowType = ["verify-email", "reset-password"];
  const path = allowType.includes(type) ? type : "";
  const verifyUrl = `${baseUrl}/auth/${path}/${token}`;
  const data = { token, userId, user, verifyUrl };

  const template = await loadEmail("auth/verifyEmail", data);

  console.log(`Bắt đầu gửi email tới: ${user?.email}`);

  await transporter.sendMail({
    from: MAIL_SENDER_FROM,
    subject: "Verification email",
    to: user.email,
    html: template,
  });

  await userService.update(userId, {
    email_sent_at: new Date(),
  });
}

module.exports = sendVerifyEmailJob;
