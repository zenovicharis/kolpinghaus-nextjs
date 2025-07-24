import { connectToDatabase } from "../mongodb";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "work-time";

export interface IWorkTime {
  _id: ObjectId;
  Montag: string;
  Dienstag: string;
  Mittwoch: string;
  Donnerstag: string;
  Freitag: string;
  Samstag: string;
  Sonntag: string;
}

/**
 * Fetches the work time document from the database.
 * Assumes there is only one document in the collection.
 */
export async function getWorkTime() {
  const { db } = await connectToDatabase();
  const result = await db.collection<IWorkTime>(COLLECTION_NAME).findOne({});
  return result;
}

/**
 * Inserts a new work time document.
 * Should only be used for seeding the database, as there should only be one document.
 * @param workTime The work time object to insert.
 */
export async function insertWorkTime(workTime: Omit<IWorkTime, "_id">) {
  const { db } = await connectToDatabase();
  await db.collection(COLLECTION_NAME).insertOne(workTime);
}

/**
 * Deletes all work time documents in the collection.
 * Useful for cleaning up before seeding.
 */
export async function deleteAllWorkTimes() {
  const { db } = await connectToDatabase();
  await db.collection(COLLECTION_NAME).deleteMany({});
}
