const router = require("express").Router();
const UserController = require("../controllers/User.controller");
router.get("/users", UserController.index);

module.exports = router;
