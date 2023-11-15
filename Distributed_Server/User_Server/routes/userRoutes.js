const express = require("express");
const { register, login, fetchUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:userID", fetchUser);

module.exports = router;
