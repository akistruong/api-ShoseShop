const router = require("express").Router();
const Multer = require("../commom/Multer");
const UploadController = require("../controllers/Upload.controller");

router.post(
  "/upload/product-imgs",
  Multer.array("imgs", 5),
  UploadController.productImgs
);
router.post(
  "/upload/product-imgs-colors",
  Multer.array("colors", 5),
  UploadController.colorImgs
);

module.exports = router;
