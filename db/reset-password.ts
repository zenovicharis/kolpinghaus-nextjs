import { db } from '../lib/drizzle';
import { admin } from '../db/schema';
import { eq }from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';

async function resetPassword() {
  const username = process.argv[2];
  const newPassword = process.argv[3];

  if (!username || !newPassword) {
    console.error('Usage: ts-node db/reset-password.ts <username> <newPassword>');
    process.exit(1);
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await db.update(admin).set({ password: hashedPassword }).where(eq(admin.username, username));
    console.log(`Password for user "${username}" has been reset successfully.`);
  } catch (error) {
    console.error('Failed to reset password:', error);
    process.exit(1);
  }
}

resetPassword();
