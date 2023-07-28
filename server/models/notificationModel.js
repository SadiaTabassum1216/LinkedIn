const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  senderUserId: {
    type: String,
    required: true,
    ref: 'User',
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
  }, 
  message: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
