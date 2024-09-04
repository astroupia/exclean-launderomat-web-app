import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const MONGODB_URL = process.env.MONGODB_URL;

console.log("MONGODB_URL:", MONGODB_URL); // Log the URL (make sure to remove this in production)

let cachedClient: mongoose.Mongoose | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log("Using cached database connection");
    return { client: cachedClient, db: cachedDb };
  }

  if (!process.env.MONGODB_URL) {
    throw new Error("Please define the MONGODB_URL environment variable");
  }

  try {
    const client = await mongoose.connect(process.env.MONGODB_URL);
    const db = client.connection.db;

    cachedClient = client;
    cachedDb = db;

    console.log("New database connection established");
    return { client, db };
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

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
