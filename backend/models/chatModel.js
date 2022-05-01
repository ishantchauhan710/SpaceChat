const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    chatUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SpaceChat_User",
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpaceChat_Messages",
    },
    chatAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatAdmin",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("SpaceChat_Chats", chatSchema);
module.exports = Chat;
