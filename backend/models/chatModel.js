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
      ref: "SpaceChat_Message",
    },
    chatAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpaceChat_User",
      default: null,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("SpaceChat_Chat", chatSchema);
module.exports = Chat;
