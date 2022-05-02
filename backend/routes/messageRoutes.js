const express = require("express");
const { sendMessageController, getAllMessagesController } = require("../controllers/messageControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(authMiddleware,sendMessageController);
router.route("/:chatId").get(authMiddleware,getAllMessagesController);


module.exports = router;