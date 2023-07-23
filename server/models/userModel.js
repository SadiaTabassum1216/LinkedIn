const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    
    name:{
        type:String,
        require:[true,"Please add user name."]
    },
    email:{
        type:String,
        require:[true,"Please add user email."],
        unique: [true, "Email already used."]
    },
    password:{
        type:String,
        require:[true,"Please add user password."]
    },
},
// {
//     timestamps: true
// }
)

module.exports= mongoose.model("User", userSchema);