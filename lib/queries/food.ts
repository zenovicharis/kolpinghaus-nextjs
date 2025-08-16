import { db } from "../drizzle";
import { food, picklists, NewFood } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function getFood() {
  const mainCategories = await db.select().from(picklists).where(eq(picklists.delimeter, "main"));

  const foodData = [];

  for (const mainCategory of mainCategories) {
    const subCategories = await db.select().from(picklists).where(eq(picklists.description, mainCategory.title));

    const types = [];
    for (const subCategory of subCategories) {
      const items = await db.select().from(food).where(eq(food.subtypeId, subCategory.id));
      types.push({
        name: subCategory.title,
        list: items,
      });
    }
    foodData.push({
      name: mainCategory.title,
      types: types,
    });
  }

  return foodData;
}

export async function getFoodById(id: number) {
  const result = await db.select().from(food).where(eq(food.id, id)).limit(1);
  return result[0];
}

export async function getCategories() {
  const result = await db.select().from(picklists).where(eq(picklists.delimeter, "sub"));
  return result;
}

export async function addFood(newFood: NewFood) {
  await db.insert(food).values(newFood);
}

export async function updateFood(id: number, foodData: Partial<NewFood>) {
  await db.update(food).set(foodData).where(eq(food.id, id));
}

export async function deleteFood(id: number) {
  await db.delete(food).where(eq(food.id, id));
}
