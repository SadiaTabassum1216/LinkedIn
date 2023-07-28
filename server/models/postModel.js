const mongoose = require('mongoose');
const User = require("../models/userModel");

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User', 
  },
  userName: {
    type: String,
    // required: true,
  },
  text: {
    type: String,
  },
  fileURL: {
    type: String,
    default: '',
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports= mongoose.model('Post', postSchema);