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
  seen: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now,
    expires: '1h',
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
