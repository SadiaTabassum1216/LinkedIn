const asyncHandler = require("express-async-handler");
const Notification =require("../models/notificationModel");
const Post = require("../models/postModel");


//@desc DELETE old notifications, Get remaining notifications
//@route GET /api/notifications/
const getAllNotification = asyncHandler(async (req, res) => {
  try {
    const sixHoursAgo = new Date();
    sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);

    const oldNotifications = await Notification.find({ time: { $lt: sixHoursAgo } });

    for (const notification of oldNotifications) {
      await notification.remove();
    }
    
        const notifications = await Notification.find();
        res.json(notifications);
        console.log(notifications);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notifications' });
      }
});


//@desc Get post from notification
//@route GET /api/notifications/post/:notificationId
const getPost = asyncHandler(async (req, res) => {
  try {  
    const notificationId = req.params.notificationId; 
    // const postId = req.params.postId;

    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.seen = true;
    await notification.save();

    const postId = notification.postId;
    const post = await Post.findById(postId);


    if (post) {
      console.log('Found post:', post);
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