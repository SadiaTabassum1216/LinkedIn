const express = require("express");
const {
  getAllPosts,
  fetchPost,
  uploadPost,
} = require("../controllers/postController");
const validateToken = require("../middleware/tokenHandler");
const router = express.Router();

router.post("/create", uploadPost, validateToken);
router.get("/home", getAllPosts, validateToken);
router.get("/fetchPost", fetchPost, validateToken);

module.exports = router;
