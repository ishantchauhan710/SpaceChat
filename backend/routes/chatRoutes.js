const express = require("express");
const { createChatController } = require("../controllers/chatControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Will create chat if not exists and will return old chats if exixts
router.route("/create").post(authMiddleware,createChatController);

module.exports = router;