const router = require("express").Router();
const CategoryController = require("../controllers/Category.controller");
//GET - get all categorys
router.get("/category/:id", CategoryController.getProductByCategory);
router.get("/categorys", CategoryController.index);

module.exports = router;
