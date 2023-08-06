const asyncHandler = require("express-async-handler");
const multer = require('multer');
const Post = require("../models/postModel");
const User = require("../models/userModel");
const minio = require("../config/minio");
const minioClient = minio.connectToMinio();

const bucketName = 'linkedin';
const storage = 'uploads';
const upload = multer({ dest: storage });


async function uploadToMinio(file) {
  // console.log(file.originalname);
  const objectKey = file.originalname;
  const metaData = {
    'Content-Type': file.mimetype,
  }

  minioClient.fPutObject(bucketName, objectKey, file.path, metaData, (err, etag) => {
    if (err) {
      console.log(err);
      return null;
    }
    console.log("successfully uploaded photo");
  });

  return objectKey;
}

//@desc upload post
//@route POST /api/posts/create
const uploadPost = asyncHandler(async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    console.log("file: ", req.file);
    const text = req.body.text;
    const userId = req.body.userId;
    console.log("text: ", text);
    if (err) {
      return res.status(500).json({ error: 'Error uploading the image.' });
    }

    let _imageId = null;
    if (req.file) {
      _imageId = await uploadToMinio(req.file);
    }

    const user = await User.findById(userId);

  const newPost = new Post({
    userId,
    userName: user.name,
    text,
    fileURL:_imageId,
  });

  await newPost.save();
  return res.status(201).json(newPost);

  });

});


//@desc Get all the posts on newsfeed
//@route GET /api/posts/home
const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } 
  catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

module.exports = { getAllPosts, uploadPost };