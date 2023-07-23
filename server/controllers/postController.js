const asyncHandler= require("express-async-handler");
const Post= require("../models/postModel");

const post = asyncHandler( async (req, res) => {
    res.json(req.user)
});

const allPost = asyncHandler( async (req, res) => {
    res.json(req.user)
});


const notification = asyncHandler( async (req, res) => {
    res.json(req.user)
});



module.exports= {post , allPost, notification};