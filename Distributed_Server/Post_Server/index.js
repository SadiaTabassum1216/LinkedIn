const express=require("express");
const {connectDB} = require("./config/dbConnection");
const {createMinioBucket} = require("./config/minio");
require("dotenv").config();
const app=express();

const cors=require('cors');
app.use(cors());

const port=process.env.PORT;
const bucket= 'linkedin';

connectDB();
createMinioBucket(bucket);

app.use(express.json());
app.use("/api/posts", require("./routes/postRoutes"));

app.listen(port, ()=>{
    console.log('Post server is running on port ',port);
})
