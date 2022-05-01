const express = require("express");
const { createChatController, getChatsController } = require("../controllers/chatControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Will create chat if not exists and will return old chats if exixts
router.route("/create").post(authMiddleware,createChatController);
router.route("/").get(authMiddleware,getChatsController);


module.exports = router;