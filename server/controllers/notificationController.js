const asyncHandler = require("express-async-handler");
const Notification =require("../models/notificationModel");


//@desc Get all notifications
//@route GET /api/notifications/
const getAllNotification = asyncHandler(async (req, res) => {
    try {
        console.log("fetching newsfeed");
        const notifications = await Notification.find();
        res.json(notifications);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notifications' });
      }
});


//@desc Get post from notification
//@route GET /api/notifications/post/`{id}`
const getPost = asyncHandler(async (req, res) => {
    const postId = req.body.postId;

    Post.findById(postId)
      .then((post) => {
        if (post) {
          console.log('Found post:', post);
        } else {
          console.log('Post not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
});

//@desc Create a new notification
//@route POST /api/notifications/
const createNotification = asyncHandler(async (req, res) => {
    const {userId} = req.body; 
        
        const newNotification = new Notification({
          senderUserId: userId,
          postId: savedPost._id,
          message: `A new post has been created by ${userName}`,
        });
    
        await newNotification.save();
    
});

module.exports = {getAllNotification, getPost, createNotification };