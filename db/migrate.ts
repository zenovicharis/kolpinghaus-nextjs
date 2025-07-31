import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const main = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    multipleStatements: true,
  });

  const db = drizzle(connection);

  const migrationsFolder = './drizzle';
  const migrationFile = fs.readdirSync(migrationsFolder).find(file => file.endsWith('.sql'));

  if (migrationFile) {
    const migration = fs.readFileSync(path.join(migrationsFolder, migrationFile), 'utf-8');
    const statements = migration.split('--> statement-breakpoint').map(stmt => stmt.trim());
    for (const statement of statements) {
      if (statement) {
        await connection.query(statement);
      }
    }
  }

  console.log('Migration complete');
  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});