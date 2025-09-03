import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

interface ConnectToDatabaseResult {
  client: MongoClient;
  db: Db;
}

export async function connectToDatabase(): Promise<ConnectToDatabaseResult> {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
  if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
