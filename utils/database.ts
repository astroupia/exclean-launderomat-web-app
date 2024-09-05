import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("MONGODB_URL is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "exclean", // Change this to your database name
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
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

// Call the function to set up listeners
setupMongooseListeners();

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
