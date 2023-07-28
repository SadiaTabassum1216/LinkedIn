const asyncHandler = require("express-async-handler");
const Notification =require("../models/notificationModel");
const Post = require("../models/postModel");


//@desc Get all notifications
//@route GET /api/notifications/
const getAllNotification = asyncHandler(async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notifications' });
      }
});


//@desc Get post from notification
//@route GET /api/notifications/post/:postId
const getPost = asyncHandler(async (req, res) => {
  try {   
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (post) {
      // console.log('Found post:', post);
      res.status(200).json(post);
    } else {
      console.log('Post not found.');
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


//@desc Create a new notification
//@route POST /api/notifications/
const createNotification = asyncHandler(async (req, res) => {
  const { userName, _id , userId,} = req.body;
  console.log("request body: ",req.body);

  const newNotification = new Notification({
    senderUserId: userId,
    postId: _id,
    message: `A new post has been created by ${userName}`,
  });

  await newNotification.save();
  return res.json(newNotification);
    
});

module.exports = {getAllNotification, getPost, createNotification };