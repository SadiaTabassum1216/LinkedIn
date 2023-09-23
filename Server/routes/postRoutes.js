const express = require("express");
const {  getAllPosts , uploadPost} = require("../controllers/postController");
const validateToken = require("../middleware/tokenHandler");
const router = express.Router();

router.post("/create", uploadPost ,validateToken);
router.get("/home", getAllPosts,validateToken);

module.exports =router;