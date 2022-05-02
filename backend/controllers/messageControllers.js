const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

const sendMessageController = expressAsyncHandler(async (req, res) => {
  const { chatId, messageContent } = req.body;

  if (!chatId || !messageContent) {
    res.status(400);
    throw new Error("Incomplete Details");
  }

  const messageBody = {
    messageSender: req.user._id,
    messageContent: messageContent,
    messageChat: chatId,
  };

  try {
    let message = await Message.create(messageBody);

    message = await message.populate(
      "messageSender",
      "sc_userName sc_userProfilePicture"
    );

    message = await message.populate("messageChat");

    message = await message.populate("messageContent", {
        path: "messageChat.chatUsers",
        select: "sc_userName, sc_userEmail, sc_userProfilePicture",
      });
    

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getAllMessagesController = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ messageChat: req.params.chatId })
      .populate("messageSender", "sc_userName, sc_userPic, sc_userEmail")
      .populate("messageChat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessageController, getAllMessagesController };
