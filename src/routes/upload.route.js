const express = require("express");
const { uploadAvatar, uploadPostImage } = require("@/middleware/upload");

const router = express.Router();

router.post("/upload/avatar", uploadAvatar.single("avatar"), (req, res) => {
  res.json({ url: req.file.path });
});

router.post(
  "/upload/post-image",
  uploadPostImage.single("cover"),
  (req, res) => {
    res.json({ url: req.file.path });
  }
);

module.exports = router;
