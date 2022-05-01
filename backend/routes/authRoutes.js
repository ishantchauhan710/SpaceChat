const express = require("express");
const { loginUserController, signupUserController } = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", signupUserController);
router.post("/login", loginUserController);

module.exports = router;