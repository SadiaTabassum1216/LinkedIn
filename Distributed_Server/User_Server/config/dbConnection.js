const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://user_db:27017/userDB`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = { connectDB };
