const Multer = require("../commom/Multer");
const fs = require("fs");
const {
  Cloudinary,
  cloudinaryImageUploadMethod,
} = require("../commom/Cloudinary");
const Products = require("../models/Product.model");
class UploadController {
  async productImgs(req, res, next) {
    const FileArray = [];
    try {
      console.log(req.files);
      for (let i = 0; i < req.files.length; i++) {
        const responseUpload = await cloudinaryImageUploadMethod(
          req.files[i].path
        );
        FileArray.push(responseUpload);
        const filePath = req.files[i].path;
        fs.unlinkSync(filePath);
      }
      res.json({ Files: FileArray });
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error 500");
    }
  }
  async colorImgs() {}
  async destroy(req, res, next) {
    const { _id, id } = req.body;
    console.log(id, _id);
    Cloudinary.v2.uploader.destroy(id, async (err, result) => {
      if (err) {
        console.log(err);
        res.json(err);
      }
      try {
        if (_id) {
          let response = await Products.findOne({ _id });
          if (response) {
            response.imgs = response.imgs.filter(
              (item) => item.public_id != id
            );
            console.log({ response });
            await response.save();
            res.json({ result, id, imgsRemain: response.imgs });
          }
        } else {
          res.json({ result, id });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
}

module.exports = new UploadController();
