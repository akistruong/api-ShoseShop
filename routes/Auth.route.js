const router = require("express").Router();
const AuthController = require("../controllers/Auth.controller");
router.post("/login", AuthController.login);

module.exports = router;
