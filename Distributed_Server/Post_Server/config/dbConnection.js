const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://post_db:27017/postDB`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = { connectDB };
