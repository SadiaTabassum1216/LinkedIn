const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register user
//@route POST /api/users/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory.");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered.");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await new User({
    name,
    email,
    password: hashPassword,
  });

  await user.save();

  res.json({ message: "Register successful" });
});

//@desc Login user
//@route GET /api/users/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mendaory.");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    //create jwt
    const accessToken = jwt.sign(
      {
        user: {
          username: user.name,
          email: user.email,
          id: user.id,
        },
      },
      "7b54786387e7de22f145417162d7ad524629fc929f1a7fa65daa6e5d2629077c46c1c110d387c7448a764768dc065270303de48870d73460e9e56154bc9d68a4",
      {
        expiresIn: "15m",
      }
    );
    res.json({
      token: accessToken,
      message: "Login Successful",
      username: user.name,
      userId: user.id,
    });
  } else {
    throw new Error("Email or Password is not valid.");
  }
});

//@desc fetch post from notification
//@route GET /api/posts/fetchPost
const fetchUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = { register, login, fetchUser };
