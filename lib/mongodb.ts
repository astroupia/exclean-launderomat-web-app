import { Db } from "mongodb";

let cachedDb: Db | null = null;

export async function getDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const clientPromise = (await import("../utils/database")).default;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  cachedDb = db;
  return db;
}
