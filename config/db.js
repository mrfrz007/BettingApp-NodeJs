const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const ConnectDb = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Fetch MongoDB URI from .env

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = ConnectDb;
