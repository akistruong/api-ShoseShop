const Cloudinary = require("cloudinary");
require("dotenv").config();
Cloudinary.v2.config({
  cloud_name: process.env.CLOUD_CLOUDINARY_NAME,
  api_key: process.env.CLOUD_CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUD_CLOUDINARY_APISECRET,
});

module.exports = Cloudinary;
