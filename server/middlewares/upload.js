const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
//here directly file upload in cloudinary 
//no file upload in local server
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "college-calendar",
    resource_type: "auto",
    format: async (req, file) => "jpeg", // 🔥 FORCE jpeg FORMAT
  },
});

const upload = multer({ storage });

module.exports = upload;