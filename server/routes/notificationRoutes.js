const express = require("express");
const {getAllNotification, getPost, createNotification }= require("../controllers/notificationController");
const validateToken = require("../middleware/tokenHandler");
const router = express.Router();

router.get("/",getAllNotification , validateToken);
router.post("/create",createNotification , validateToken);
router.get("/post/`{id}`",getPost , validateToken);

module.exports =router;