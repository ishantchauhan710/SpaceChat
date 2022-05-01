const express = require("express");
const { loginUserController, signupUserController } = require("../controllers/authControllers");
const { searchUserController } = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/search").get(authMiddleware,searchUserController);

module.exports = router;