import { Db } from "mongodb";

let cachedDb: Db | null = null;

export async function getDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const { connectToDatabase } = await import("../utils/database");
  const client = await connectToDatabase();
  const db = client.db(process.env.MONGODB_DB);
  cachedDb = db;
  return db;
}
