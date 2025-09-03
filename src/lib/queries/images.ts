
import { db } from "../drizzle";
import { images, NewImage } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function getImages() {
  const result = await db.select().from(images);
  return result;
}

export async function getImageById(id: number) {
  const result = await db.select().from(images).where(eq(images.id, id));
  return result[0];
}

export async function addImage(newImage: NewImage) {
  await db.insert(images).values(newImage);
}

export async function deleteImage(id: number) {
  await db.delete(images).where(eq(images.id, id));
}
