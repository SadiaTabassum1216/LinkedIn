const asyncHandler = require("express-async-handler");
const multer = require('multer');
const Post = require("../models/postModel");
const User = require("../models/userModel");
// const minio= require("../config/minio");
const minioClient = require("../config/minio");


const bucketName = 'linkedin';

// const minioClient=minio.connectToMinio();

// const DIR = "./uploads/";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, fileName);
//   },
// });

// var upload = multer({
//   storage: storage,
//   // limits: {
//   //   fileSize: 1024 * 1024 * 5
//   // },
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//   },
// });

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

// const getImageFromMinio = (imageId) => {
//   return new Promise((resolve, reject) => {
//       minioClient.getObject('linked-in', imageId, (err, dataStream) => {
//           if (err) {
//               reject(err);
//           } else {
//               const chunks = [];
//               dataStream.on('data', (chunk) => {
//                   chunks.push(chunk);
//               });

//               dataStream.on('end', () => {
//                   const imageData = Buffer.concat(chunks);
//                   resolve(imageData);
//               });

//               dataStream.on('error', (err) => {
//                   reject(err);
//               });
//           }
//       });
//   });
// };
// const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/' });


//@desc upload image
//@route POST /api/posts/upload
const uploadImage = asyncHandler(async (req, res) => {
  upload.single('image')(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: 'Error uploading the image.' });
    } else if (err) {
      return res.status(500).json({ error: 'Unknown error uploading the image.' });
    }

    console.log('Uploaded file:', req.file);

    let _imageId = null;

    if (req.file) {
      _imageId = await uploadToMinio(req.file);
    }
    _imageId = _imageId ? _imageId : null;

    return res.status(200).json({ message: 'File uploaded successfully.', url: _imageId });
  });


});


//@desc Create a new post
//@route POST /api/posts/create
const createPost = asyncHandler(async (req, res) => {
  const { text, userId } = req.body;
  console.log("request: ", req.body);
  console.log("file: ", req.file);

  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading the image.' });
    }
  });

    let _imageId = null;

    if (req.file) {
      _imageId = await uploadToMinio(req.file);
    }
    _imageId = _imageId ? _imageId : null;

    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      userName: user.name,
      text,
      fileURL: _imageId,
    });

    await newPost.save();
    console.log("Post: ", res.json(newPost))
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