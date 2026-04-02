const mongoose = require("mongoose");
const DB_NAME=require("../constants")
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error !",error);
    process.exit(1);
  }
};

module.exports = connectDB;