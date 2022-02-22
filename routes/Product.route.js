const router = require("express").Router();
const ProductController = require("../controllers/Product.controller");
const isAdmin = require("../midlleware/isAdmin.middleware");
const isLogin = require("../midlleware/isLogin.middleware");
//Method:Get - get all products
router.get("/products", ProductController.index);
//Method:Get - get single product
router.get("/products/:id", ProductController.getSingleProduct);
//Method:Post - create a product
router.post("/create-product", ProductController.create);
router.patch("/update-product/:id", ProductController.update);
router.delete("/delete-product", ProductController.delete);
module.exports = router;
