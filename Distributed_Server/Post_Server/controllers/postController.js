const asyncHandler = require("express-async-handler");
const multer = require("multer");
const Post = require("../models/postModel");
const minio = require("../config/minio");
const minioClient = minio.connectToMinio();
const axios = require("axios");
const jwt = require("jsonwebtoken");

const bucketName = "linkedin";
const storage = "uploads";
const upload = multer({ dest: storage });

const accessToken =
  "7b54786387e7de22f145417162d7ad524629fc929f1a7fa65daa6e5d2629077c46c1c110d387c7448a764768dc065270303de48870d73460e9e56154bc9d68a4";

async function uploadToMinio(file) {
  // console.log(file.originalname);
  const objectKey = file.originalname;
  const metaData = {
    "Content-Type": file.mimetype,
  };

  minioClient.fPutObject(
    bucketName,
    objectKey,
    file.path,
    metaData,
    (err, etag) => {
      if (err) {
        console.log(err);
        return null;
      }
      console.log("successfully uploaded photo");
    }
  );

  return objectKey;
}

//@desc upload post
//@route POST /api/posts/create
const uploadPost = asyncHandler(async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    console.log("file: ", req.file);
    const text = req.body.text;
    // const userId = req.body.userId;
    console.log("text: ", text);
    if (err) {
      return res.status(500).json({ error: "Error uploading the image." });
    }

    let _imageId = null;
    if (req.file) {
      _imageId = await uploadToMinio(req.file);
    }

    let user = null;

    // const response = await axios.get(
    //   `http:/host.docker.internal/users/${userId}`
    // );
    // console.log(response);
    let authHeader = req.headers["authorization"];
    console.log(req.headers);
    console.log("autheader " + authHeader);
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      console.log(token);
      if (token) {
        jwt.verify(token, accessToken, (err, decoded) => {
          if (err) {
            res.status(401);
            throw new Error("User not authorized. not verified");
          }
          user = decoded.user;
        });

        console.log(user);

        const newPost = new Post({
          userId: user.id,
          userName: user.username,
          text,
          fileURL: _imageId,
        });

        await newPost.save();
        return res.status(201).json(newPost);
      }
    }
  });
});

//@desc Get all the posts on newsfeed
//@route GET /api/posts/home
const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

//@desc fetch post from notification
//@route GET /api/posts/fetchPost
const fetchPost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { getAllPosts, uploadPost, fetchPost };
