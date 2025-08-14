const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

function createCloudinaryStorage(folder, options = {}) {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: options.allowed_formats || [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],
      transformation: options.transformation || [
        { width: 500, height: 500, crop: "limit" },
      ],
    },
  });
}

module.exports = createCloudinaryStorage;
