
import { db } from '../drizzle';
import { admin, NewAdmin, Admin } from '../../db/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';

export async function getAdmins() {
  const result = await db.select().from(admin);
  return result;
}

export async function getAdminById(id: number) {
  const result = await db.select().from(admin).where(eq(admin.id, id)).limit(1);
  return result[0];
}

export async function addAdmin(newAdmin: NewAdmin) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newAdmin.password, salt);
  await db.insert(admin).values({ ...newAdmin, password: hashedPassword });
}

export async function updateAdmin(id: number, adminData: Partial<NewAdmin>) {
  if (adminData.password && adminData.password.trim() !== '') {
    const salt = await bcrypt.genSalt(10);
    adminData.password = await bcrypt.hash(adminData.password, salt);
  } else {
    delete adminData.password;
  }
  await db.update(admin).set(adminData).where(eq(admin.id, id));
}

export async function deleteAdmin(id: number) {
  await db.delete(admin).where(eq(admin.id, id));
}
