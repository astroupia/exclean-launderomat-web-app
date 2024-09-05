import { Db, MongoClient } from "mongodb";

let cachedDb: Db | null = null;

export async function getDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }
  const { connectToDatabase } = await import("../utils/database");
  const connection = await connectToDatabase();
  if (!connection) {
    throw new Error("Failed to connect to the database");
  }
  const client = connection as unknown as MongoClient;

  const dbName = process.env.MONGODB_DB;
  if (!dbName) {
    throw new Error("MONGODB_DB environment variable is not set");
  }

  const db = client.db(dbName);
  cachedDb = db;
  return db;
}
