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
  console.log(file.originalname);
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

//@desc upload image
//@route POST /api/posts/upload
const uploadImage = asyncHandler(async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    console.log("file: ", req.file);
    if (err) {
      return res.status(500).json({ error: 'Error uploading the image.' });
    }

    let _imageId = null;

    if (req.file) {
      _imageId = await uploadToMinio(req.file);
    }

    if (!_imageId) {
      return res.status(400).json({ error: 'No file uploaded.', url: _imageId });
    }

    return res.status(200).json({ message: 'File uploaded successfully.', url: _imageId });
  });

});



//@desc Create a new post
//@route POST /api/posts/create
const createPost = asyncHandler(async (req, res) => {
  const { text, userId, fileURL } = req.body;
  console.log("request: ", req.body);

  const user = await User.findById(userId);

  const newPost = new Post({
    userId,
    userName: user.name,
    text,
    fileURL,
  });

  await newPost.save();
  // console.log("Post: ", res.json(newPost))
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

module.exports = { createPost, uploadImage, getAllPosts };