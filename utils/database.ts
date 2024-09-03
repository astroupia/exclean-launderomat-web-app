import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const MONGODB_URL = process.env.MONGODB_URL;

console.log("MONGODB_URL:", MONGODB_URL); // Log the URL (make sure to remove this in production)

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!MONGODB_URL) {
    console.error(
      "MONGODB_URL is undefined. Check your environment variables."
    );
    throw new Error("MONGODB_URL is missing");
  }

  try {
    console.log("Establishing new database connection");
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URL, {
        dbName: "exclean",
        bufferCommands: false,
      });

    cached.conn = await cached.promise;
    console.log("Database connection established successfully");

    // Set up event listeners after connection is established
    setupMongooseListeners();

    return cached.conn;
  } catch (error) {
    console.error("Failed to establish database connection:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
};

// Debugging: Log when the module is loaded
console.log("database.ts module loaded");

// Function to set up Mongoose event listeners
function setupMongooseListeners() {
  mongoose.connection.on("connected", () =>
    console.log("Mongoose connected to DB")
  );
  mongoose.connection.on("error", (err) =>
    console.log("Mongoose connection error:", err)
  );
  mongoose.connection.on("disconnected", () =>
    console.log("Mongoose disconnected")
  );
}

// Debugging: Handle process termination
process.on("SIGINT", async () => {
  if (mongoose.connection) {
    await mongoose.connection.close();
    console.log("Mongoose connection closed through app termination");
  }
  process.exit(0);
});

// Export the mongoose instance for use in other parts of the application
export { mongoose };
