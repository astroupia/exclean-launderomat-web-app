import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw Error("Monog URL is Missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "exclean-db",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
