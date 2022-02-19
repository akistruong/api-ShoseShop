const Multer = require("../commom/Multer");
const fs = require("fs");
const {
  Cloudinary,
  cloudinaryImageUploadMethod,
} = require("../commom/Cloudinary");

class UploadController {
  async productImgs(req, res, next) {
    const FileArray = [];
    for (let i = 0; i < req.files.length; i++) {
      try {
        const responseUpload = await cloudinaryImageUploadMethod(
          req.files[i].path
        );
        FileArray.push(responseUpload);
        const filePath = req.files[i].path;
        fs.unlinkSync(filePath);
      } catch (error) {
        console.log(error);
      }
    }
    res.json({ Files: FileArray });
  }
  async colorImgs() {}
}

module.exports = new UploadController();
