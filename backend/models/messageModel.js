const { default: mongoose } = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    messageSender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    messageContent: {
      type: String,
      trim: true,
    },
    messageChat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message",messageSchema);
module.exports = Message;