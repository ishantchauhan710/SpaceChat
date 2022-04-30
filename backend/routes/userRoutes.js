const express = require("express");
const { route } = require("express/lib/application");
const { loginUserController, signupUserController } = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", signupUserController);
router.post("/login", loginUserController);

module.exports = router;