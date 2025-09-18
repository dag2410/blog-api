const express = require("express");
const router = express.Router();
const pusher = require("@/config/pusher");
const checkAuth = require("@/middleware/checkAuth");

router.post("/", checkAuth, (req, res) => {
  const { socket_id, channel_name } = req.body;
  const user = req.user;

  const presenceData = {
    user_id: user.id.toString(),
    user_info: {
      username: user.username,
      avatar: user.avatar,
    },
  };

  const auth = pusher.authenticate(socket_id, channel_name, presenceData);
  res.send(auth);
});

module.exports = router;
