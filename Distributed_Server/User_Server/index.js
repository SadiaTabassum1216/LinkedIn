const express = require('express');
const app = express();
const port=process.env.PORT;


app.use(express.json());
app.use("/api/notifications", require("./routes/notificationRoutes"));

app.listen(port, ()=>{
    console.log('User server is running on port ',port);
})
