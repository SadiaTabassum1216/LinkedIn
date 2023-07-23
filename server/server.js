const express=require("express");
const connectDB = require("./config/dbConnection");
require("dotenv").config();
const app=express();
const cors=require('cors');
app.use(cors());

const port=process.env.PORT || 5555;

connectDB();
app.use(express.json());    //middleware to parse the datastream
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, ()=>{
    console.log('server is running on port ',port);
})