const express = require("express");
const upload = require("@/middleware/upload");
const { error, success } = require("@/utils/response");

const router = express.Router();

router.post("/avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return error(res, 400, "No file uploaded");
  }
  success(res, 200, { url: req.file.path });
});

router.post("/cover", upload.single("cover_image"), (req, res) => {
  if (!req.file) {
    return error(res, 400, "No file uploaded");
  }
  success(res, 200, { url: req.file.path });
});

router.post("/post-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return error(res, 400, "No file uploaded");
  }
  success(res, 200, { url: req.file.path });
});

module.exports = router;
