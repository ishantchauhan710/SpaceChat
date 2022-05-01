const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const createChatController = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("userId cannot be blank");
  }

  var chatExists = await Chat.find({
    isGroupChat: false,
    $and: [
      { chatUsers: { $elemMatch: { $eq: req.user._id } } },
      { chatUsers: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("chatUsers", "-password")
    .populate("lastMessage");

  if (chatExists.length > 0) {
    res.send(chatExists[0]);
  } else {
    var chat = {
      chatName: "Single Chat",
      isGroupChat: false,
      chatUsers: [req.user._id, userId],
    };
  }

  try {
    const newChat = await Chat.create(chat);

    const finalChat = await Chat.findOne({ _id: newChat._id }).populate(
      "chatUsers",
      "-password"
    );

    res.status(200).send(finalChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { createChatController };
