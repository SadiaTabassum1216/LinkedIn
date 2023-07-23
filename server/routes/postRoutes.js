const express = require("express");
const { post, allPost, notification } = require("../controllers/postController");
const router = express.Router();

router.post("/post", post);
router.get("/posts", allPost);
router.post("/notification",notification);

module.exports =router;