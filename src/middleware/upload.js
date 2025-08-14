const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog/avatar",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 300, height: 300, crop: "fill" }],
  },
});

const postImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog/post-image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, crop: "limit" }],
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
});
const uploadPostImage = multer({
  storage: postImageStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = { uploadAvatar, uploadPostImage };
