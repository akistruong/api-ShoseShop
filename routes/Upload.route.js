const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.array("imgs", 5), (req, res, next) => {
  console.log("Images : ", req.files);
});

module.exports = router;
