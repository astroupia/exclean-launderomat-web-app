import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  const dbUrl = process.env.MONGODB_URL;
  const dbName = "exclean"; // Hardcode the database name

  if (!dbUrl) {
    throw new Error("MongoDB URL is not defined in environment variables");
  }

  try {
    const db = await mongoose.connect(dbUrl, { dbName });
    isConnected = true;
    console.log(`Connected to database: ${db.connection.name}`);
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error; // Re-throw the error for better error handling
  }
};

export class ObjectId {
  constructor(id?: string) {
    return new mongoose.Types.ObjectId(id);
  }
}

export function serializeObjectId(id: mongoose.Types.ObjectId): string {
  return id.toString();
}
