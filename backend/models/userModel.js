const { default: mongoose } = require("mongoose");
const { DEFAULT_PROFILE_PICTURE } = require("../constants/source");

// sc: Space Chat
const userSchema = mongoose.Schema(
  {
    sc_userName: { type: String, required: true },
    sc_userEmail: { type: String, required: true },
    sc_userPassword: { type: String, required: true },
    sc_userProfilePicture: { type: String, required: false, default: DEFAULT_PROFILE_PICTURE },
  },
  { timestamps: true }
);

const User = mongoose.model("SpaceChat_User",userSchema);
module.exports = User;