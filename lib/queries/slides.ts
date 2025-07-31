
import { db } from '../drizzle';
import { slides, NewSlides } from '../../db/schema';
import { eq } from 'drizzle-orm';

export async function getSlides() {
  const result = await db.select().from(slides);
  return result;
}

export async function getSlideById(id: number) {
  const result = await db.select().from(slides).where(eq(slides.id, id)).limit(1);
  return result[0];
}

export async function addSlide(newSlide: NewSlides) {
  await db.insert(slides).values(newSlide);
}

export async function updateSlide(id: number, slideData: Partial<NewSlides>) {
  await db.update(slides).set(slideData).where(eq(slides.id, id));
}

export async function deleteSlide(id: number) {
  await db.delete(slides).where(eq(slides.id, id));
}
