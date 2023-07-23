const asyncHandler= require("express-async-handler");
const User= require("../models/userModel");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

//@desc Register user
//@route POST /api/users/register
//@access public
const register = asyncHandler( async (req, res) => {
    console.log("request body: ",req.body);
    const {name, email, password}=req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory.");
      }
      
    const userAvailable= await User.findOne({email})

    if(userAvailable){
        res.status(400);
        throw new Error("User already registered.");
    }

    const hashPassword= await bcrypt.hash(password,10);

    const user= await new User({
        name,email,password:hashPassword,
    });

    await user.save();
    console.log(user);

    // if(user){
    //     res.status(201).json({_id: user._id, email: user.email})
    // }
    // else{
    //     res.status(400);
    //     throw new Error("User data not valid.");
    // }

        res.json({message:"Register the user"})
});

//@desc Login user
//@route GET /api/users/login
//@access public
const login = asyncHandler( async (req, res) => {
    const {email, password}=req.body;
    
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mendaory.");
    }

    const user= await User.findOne({email});
    if(user && bcrypt.compare(password,user.password)){
        //create jwt
        const accessToken= jwt.sign({
            user:{
                username: user.name,
                email: user.email,
                id: user.id,
            }
        },
        process.env.JWT_SECTET_KEY,
        {
            expiresIn:"10m"
        }
        )
        res.status(200).json({accessToken})
    }
    else{
        res.status(401);
        throw new Error("Email or Password is not valid.");
    }



    res.json({message:"Login the user"})
});


//@desc Login user
//@route GET /api/users/login
//@access public
const current = asyncHandler( async (req, res) => {
    res.json(req.user)
});


module.exports= {register,login,current};