const userService = require("@/service/user.service");
const { generateEmailVerifyToken } = require("@/service/jwt.service");
const { MAIL_SENDER_FROM, FRONTEND_URL } = require("@/config/auth");
const loadEmail = require("@/utils/loadEmail");
const transporter = require("@/config/mailer");

async function sendVerifyEmailJob(job) {
  const { userId, type } = JSON.parse(job.payload);
  const user = await userService.getById(userId);
  const currentTime = new Date();
  const created_at_format = currentTime.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const token = generateEmailVerifyToken(userId);
  const baseUrl = FRONTEND_URL;
  const allowType = ["verify-email", "reset-password"];
  const path = allowType.includes(type) ? type : "";
  const verifyUrl = `${baseUrl}/${path}/?token=${token}`;
  const data = { token, user, verifyUrl, created_at_format };

  const template = await loadEmail("auth/verifyEmail", data);

  console.log(
    `Bắt đầu gửi email tới: ${user.email}, bạn có 10 phút để xác thực tài khoản.`
  );

  await transporter.sendMail({
    from: MAIL_SENDER_FROM,
    subject: "Verification email",
    to: user.email,
    html: template,
  });

  await userService.update(userId, {
    email_send_at: new Date(),
  });
}

module.exports = sendVerifyEmailJob;
