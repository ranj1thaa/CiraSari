const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudconfig");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "cirasari",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "webm"],
  },
});

const upload = multer({ storage });

module.exports = upload;
