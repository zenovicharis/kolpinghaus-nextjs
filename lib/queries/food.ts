import { connectToDatabase } from "../mongodb";
import { Document } from "mongodb";

const COLLECTION_NAME = "food";

interface FoodListItem {
  name: string;
  price: string;
  info: string;
}

interface FoodType {
  name: string;
  list: FoodListItem[];
}

interface Food extends Document {
  name: string;
  types: FoodType[];
}

export async function insertFood(food: Food[]) {
  let { db } = await connectToDatabase();
  await db.collection<Food>(COLLECTION_NAME).insertMany(food);
}

export async function deleteAllFood() {
  let { db } = await connectToDatabase();
  let food = await db.collection<Food>(COLLECTION_NAME).find().toArray();

  await db
    .collection(COLLECTION_NAME)
    .deleteMany({ _id: { $in: food.map((w) => w._id) } });
}
