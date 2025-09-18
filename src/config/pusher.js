require("dotenv").config({
  path: require("path").join(__dirname, "../../.env"),
});
const Pusher = require("pusher");

const pusher = new Pusher({
  cluster: "",
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  host: process.env.PUSHER_HOST,
  port: parseInt(process.env.PUSHER_PORT, 10),
  useTLS: process.env.PUSHER_USE_TLS === "true",
  debug: true,
});

module.exports = pusher;
