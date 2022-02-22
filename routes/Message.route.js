const router = require("express").Router();
const MessageController = require("../controllers/Message.controller");
router.get("/messages", MessageController.index);

module.exports = router;
