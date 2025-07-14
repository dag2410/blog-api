const nodemailer = require("nodemailer");

const tranporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "" },
});
