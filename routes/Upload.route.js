const router = require("express").Router();
const Multer = require("../commom/Multer");
const {
  Cloudinary,
  cloudinaryImageUploadMethod,
} = require("../commom/Cloudinary");
const fs = require("fs");

router.post(
  "/upload/product-imgs",
  Multer.array("imgs", 5),

  async (req, res, next) => {
    const FileArray = [];
    for (let i = 0; i < req.files.length; i++) {
      try {
        console.log("Vào Try");
        const responseUpload = await cloudinaryImageUploadMethod(
          req.files[i].path
        );
        FileArray.push(responseUpload);
        const filePath = req.files[i].path;
        console.log(filePath);
        fs.unlinkSync(filePath);
      } catch (error) {
        console.log("Vào Catch");
        console.log(error);
      }
    }
    res.json({ Files: FileArray });
  }
);

module.exports = router;
