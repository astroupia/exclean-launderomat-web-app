const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URL = process.env.MONGODB_URL;

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: "exclean",
      bufferCommands: false,
    });
    console.log("Connected successfully to MongoDB");
    await mongoose.connection.close();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

testConnection();
