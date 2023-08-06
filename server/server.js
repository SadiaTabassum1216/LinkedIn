const express=require("express");
const {connectDB} = require("./config/dbConnection");
const {createMinioBucket} = require("./config/minio");
const cron = require("node-cron");
const {deleteOldNotifications}= require("./config/job");

require("dotenv").config();
const app=express();

const cors=require('cors');
app.use(cors());

const port=process.env.PORT || 5555;
const bucket= 'linkedin';

connectDB();
createMinioBucket(bucket);

// Schedule the job to run once every day at a specific time (12:00)
// cron.schedule('00 12 * * *', deleteOldNotifications);

// Schedule the job to run every 10 minutes
cron.schedule('*/10 * * * *', deleteOldNotifications);

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

app.listen(port, ()=>{
    console.log('server is running on port ',port);
})