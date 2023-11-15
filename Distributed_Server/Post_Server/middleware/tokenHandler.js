const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const accessToken =
  "7b54786387e7de22f145417162d7ad524629fc929f1a7fa65daa6e5d2629077c46c1c110d387c7448a764768dc065270303de48870d73460e9e56154bc9d68a4";
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authentication || req.headers.authorization;
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
        req.user = decoded.user;
        next();
      });

      if (!token) {
        res.status(401);
        throw new Error("User not authorized.");
      }
    }
  }
});

module.exports = validateToken;
