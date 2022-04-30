const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const { DEFAULT_PROFILE_PICTURE } = require("../constants/source");

// sc: Space Chat
const userSchema = mongoose.Schema(
  {
    sc_userName: { type: String, required: true },
    sc_userEmail: { type: String, required: true },
    sc_userPassword: { type: String, required: true },
    sc_userProfilePicture: {
      type: String,
      required: false,
      default: DEFAULT_PROFILE_PICTURE,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("sc_userPassword")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.sc_userPassword = await bcrypt.hash(this.sc_userPassword, salt);
});

userSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.sc_userPassword);
};

const User = mongoose.model("SpaceChat_User", userSchema);
module.exports = User;
