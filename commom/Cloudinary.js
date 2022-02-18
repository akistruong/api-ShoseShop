const Cloudinary = require("cloudinary");
require("dotenv").config();
Cloudinary.v2.config({
  cloud_name: process.env.CLOUD_CLOUDINARY_NAME,
  api_key: process.env.CLOUD_CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUD_CLOUDINARY_APISECRET,
});

const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve, reject) => {
    Cloudinary.v2.uploader.upload(
      file,
      { folder: "Shoes/product" },
      (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve({
            public_id: res.public_id,
            url: res.secure_url,
          });
        }
      }
    );
  });
};

module.exports = { Cloudinary, cloudinaryImageUploadMethod };
