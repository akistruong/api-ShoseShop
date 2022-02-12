const router = require("express").Router();
const ProductController = require("../controllers/Product.controller");
//Method:Get - get all products
router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.getSingleProduct);
router.post("/create-product", ProductController.create);
router.patch("/update-product", ProductController.update);
router.delete("/delete-product", ProductController.delete);
module.exports = router;
