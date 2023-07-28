const asyncHandler = require("express-async-handler");
const multer = require ('multer');
const Post = require("../models/postModel");
const User = require("../models/userModel");

//@desc Create a new post
//@route POST /api/posts/create
const createPost = asyncHandler(async (req, res) => {
  const { text, fileURL , userId} = req.body;
  const user = await User.findById(userId);

  const newPost = new Post({
    userId,
    userName: user.name,
    text,
    fileURL,
  });

  await newPost.save();
  // console.log(newPost);
  return res.status(201).json(newPost);
});


//@desc Get all the posts on newsfeed
//@route GET /api/posts/home
const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

module.exports = { createPost, getAllPosts };