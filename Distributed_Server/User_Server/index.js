const express = require('express');
const {connectDB} = require("./config/dbConnection");
const app = express();
const port=process.env.PORT;

const cors=require('cors');
app.use(cors());
connectDB();

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, ()=>{
    console.log('User server is running on port ',port);
})
