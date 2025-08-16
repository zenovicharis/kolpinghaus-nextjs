import { db } from "../drizzle";
import { workTime, Worktime } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function getWorkTime() {
  const result = await db.select().from(workTime);
  return result;
}

export async function updateWorkTime(id: number, data: Partial<Worktime>) {
  await db.update(workTime).set(data).where(eq(workTime.id, id));
}
