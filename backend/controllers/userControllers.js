const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");

const signupUserController = expressAsyncHandler(async (req, res) => {
  const { userName, userEmail, userPassword, userProfilePicture } = req.body;

  if (!userName) {
    res.status(400);
    throw new Error("Username cannot be blank");
  }

  if (!userEmail) {
    res.status(400);
    throw new Error("Email cannot be blank");
  }

  if (!userPassword) {
    res.status(400);
    throw new Error("Password cannot be blank");
  }

  const userExists = await User.findOne({ sc_userEmail: userEmail });

  if (userExists) {
    res.status(400);
    throw new Error("User with the provided email id already exixts");
  }

  const user = await User.create({
    sc_userName: userName,
    sc_userEmail: userEmail,
    sc_userPassword: userPassword,
    sc_userProfilePicture: userProfilePicture,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      sc_userName: user.sc_userEmail,
      sc_userEmail: user.sc_userEmail,
      sc_userProfilePicture: user.sc_userProfilePicture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Unable to create account");
  }
});

const loginUserController = expressAsyncHandler(async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail) {
    res.status(400);
    throw new Error("Email cannot be blank");
  }

  if (!userPassword) {
    res.status(400);
    throw new Error("Password cannot be blank");
  }

  const dbUser = await User.findOne({ sc_userEmail: userEmail });

  if (dbUser) {
    if (await dbUser.matchPassword(userPassword)) {
      res.status(201).json({
        _id: user._id,
        userName: user.sc_userName,
        userEmail: user.sc_userEmail,
        userProfilePicture: user.sc_userProfilePicture,
        token: generateToken(user._id),
      });
    }
  } else {
    res.status(400);
    throw new Error("No user with the provided email exists");
  }
});

module.exports = { signupUserController, loginUserController };
