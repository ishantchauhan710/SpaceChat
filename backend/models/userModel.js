const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const { DEFAULT_PROFILE_PICTURE } = require("../constants/source");

// sc: Space Chat
const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
    userProfilePicture: {
      type: String,
      required: false,
      default: DEFAULT_PROFILE_PICTURE,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("userPassword")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.userPassword = await bcrypt.hash(this.userPassword, salt);
});

userSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.userPassword);
};

const User = mongoose.model("SpaceChat_User", userSchema);
module.exports = User;
