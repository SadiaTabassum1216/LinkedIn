const express=require("express");
const {connectDB} = require("./config/dbConnection");
const {connectToMinio, createMinioBucket} = require("./config/minio");

require("dotenv").config();
const app=express();

const cors=require('cors');
app.use(cors());

const port=process.env.PORT || 5555;
const bucket= 'linkedin';

connectDB();

createMinioBucket(bucket);


app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

app.listen(port, ()=>{
    console.log('server is running on port ',port);
})