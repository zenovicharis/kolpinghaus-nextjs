import { connectToDatabase } from "../mongodb";

const COLLECTION_NAME = "work-time";

export async function insertWorkTime(workTime) {
  let { db } = await connectToDatabase();
  await db.collection(COLLECTION_NAME).insertOne(workTime);
}

export async function deleteAllWorkTimes() {
  let { db } = await connectToDatabase();
  let workTimes = await db.collection(COLLECTION_NAME).find().toArray();
  workTimes.forEach((element) => {
    console.log(element._id);
  });

  await db
    .collection("work-time")
    .deleteMany({ _id: { $in: workTimes.map((w) => w._id) } });
}
