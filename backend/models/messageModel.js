const { default: mongoose } = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    messageSender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpaceChat_User",
    },
    messageContent: {
      type: String,
      trim: true,
    },
    messageChat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpaceChat_Chat",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("SpaceChat_Message",messageSchema);
module.exports = Message;