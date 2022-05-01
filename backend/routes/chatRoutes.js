const express = require("express");
const { createChatController, getChatsController, createGroupChatController } = require("../controllers/chatControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Will create chat if not exists and will return old chats if exixts
router.route("/create").post(authMiddleware,createChatController);
router.route("/creategroup").post(authMiddleware,createGroupChatController);

router.route("/").get(authMiddleware,getChatsController);


module.exports = router;