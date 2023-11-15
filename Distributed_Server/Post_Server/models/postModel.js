const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
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
    default: "",
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
