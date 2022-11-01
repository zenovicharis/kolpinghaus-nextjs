import { connectToDatabase } from "../mongodb";

const COLLECTION_NAME = "food";

export async function insertFood(food) {
  let { db } = await connectToDatabase();
  await db.collection(COLLECTION_NAME).insertMany(food);
}

export async function deleteAllFood() {
  let { db } = await connectToDatabase();
  let food = await db.collection(COLLECTION_NAME).find().toArray();

  await db
    .collection(COLLECTION_NAME)
    .deleteMany({ _id: { $in: food.map((w) => w._id) } });
}
