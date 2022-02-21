const router = require("express").Router();
const AuthController = require("../controllers/Auth.controller");
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/login-with-facebook", AuthController.facebook);
module.exports = router;
