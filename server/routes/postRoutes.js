const express = require("express");
const { createPost ,uploadImage, getAllPosts } = require("../controllers/postController");
const validateToken = require("../middleware/tokenHandler");
const router = express.Router();

router.post("/create", createPost ,validateToken);
router.post("/upload", uploadImage ,validateToken);
router.get("/home", getAllPosts,validateToken);

module.exports =router;