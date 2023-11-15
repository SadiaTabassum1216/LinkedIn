const express = require("express");
const { connectDB } = require("./config/dbConnection");
const cron = require("node-cron");
const { deleteOldNotifications } = require("./config/job");

require("dotenv").config();
const app = express();

const cors = require("cors");
app.use(cors());
connectDB();

const port = process.env.PORT;

// Schedule the job to run every 1 minute
// cron.schedule("* * * * *", deleteOldNotifications);

// Schedule the job to run every 6 hours
cron.schedule("0 */6 * * *", deleteOldNotifications);

app.use(express.json());
app.use("/api/notifications", require("./routes/notificationRoutes"));

app.listen(port, () => {
  console.log("Notificaton server is running on port ", port);
});
