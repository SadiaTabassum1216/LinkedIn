const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader= req.headers.Authentication || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if (token) {     
            jwt.verify(token, process.env.JWT_SECTET_KEY, (err, decoded) => {
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
})

module.exports = validateToken;