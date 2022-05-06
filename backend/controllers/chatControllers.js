const expressAsyncHandler = require("express-async-handler");
const req = require("express/lib/request");
const res = require("express/lib/response");
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
    .populate("chatUsers", "-userPassword")
    .populate("lastMessage");

  if (chatExists.length > 0) {
    res.send(chatExists[0]);
  } else {
    var chat = {
      chatName: "Single Chat",
      isGroupChat: false,
      chatUsers: [req.user._id, userId],
      chatAdmin: userId
    };
  }

  try {
    const newChat = await Chat.create(chat);

    const finalChat = await Chat.findOne({ _id: newChat._id }).populate(
      "chatUsers",
      "-userPassword"
    );

    res.status(200).send(finalChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getChatsController = expressAsyncHandler(async (req, res) => {
  try {
    Chat.find({
      chatUsers: {
        $elemMatch: { $eq: req.user._id },
      },
    })
      .populate("chatUsers", "-userPassword")
      .populate("chatAdmin", "-userPassword")
      .populate("lastMessage")
      .sort({
        updatedAt: -1,
      })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "lastMessage.messageSender",
          select: "userName userEmail userProfilePicture",
        });

        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChatController = expressAsyncHandler(async (req, res) => {
  if (!req.body.groupUsers || !req.body.groupName) {
    res.status(400);
    throw new Error("Incomplete group details");
  }

  var groupUsers = JSON.parse(req.body.groupUsers);

  //console.log("Group Users: ",groupUsers);
  //console.log("Group Users Type: ",typeof(groupUsers));
  
  groupUsers.push(req.user);
  //console.log("Group Users Updated: ",groupUsers);
  
  try {
    const groupChat = await Chat.create({
      chatName: req.body.groupName,
      isGroupChat: true,
      chatUsers: groupUsers,
      groupAdmin: req.user,
    });

    const finalGroupChat = await Chat.findOne({
      _id: groupChat._id,
    })
      .populate("chatUsers", "-userPassword")
      .populate("chatAdmin", "-userPassword");

    res.status(200).json(finalGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const updateGroupChatController = expressAsyncHandler(async (req, res) => {
  if (!req.body.groupId || !req.body.groupUsers || !req.body.groupName) {
    res.status(400);
    throw new Error("Incomplete group details");
  }

  var groupUsers = JSON.parse(req.body.groupUsers);
  
  try {
    const groupChat = await Chat.findByIdAndUpdate(req.body.groupId,{
      chatName: req.body.groupName,
      chatUsers: groupUsers
    });

    const updatedGroupChat = await Chat.findOne({
      _id: groupChat._id,
    })
      .populate("chatUsers", "-userPassword")
      .populate("chatAdmin", "-userPassword");

    res.status(200).json(updatedGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});



module.exports = { createChatController, getChatsController, createGroupChatController, updateGroupChatController };
