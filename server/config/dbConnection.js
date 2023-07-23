const mongoose = require("mongoose")

require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.CONNECTION_STRING}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

// const connectDB= async () =>{
//     try{
//      const connect= await mongoose.connect(`process.env.CONNECTION_STRING/linkedin`);
//      const db= mongoose.connection
//     //  db.once('open', () => console.log('Connected to database'))
//      console.log("Database connected");
//     }catch(err){
//         console.log('Could not connect');
//         process.exit(1);
        
//     }
// }

module.exports= connectDB;