import * as dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

dotenv.config({ path: './.env' });

async function run() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const dbHost = process.env.DB_HOST;
  const dbPort = Number(process.env.DB_PORT || 3306);
  const dbUser = process.env.DB_USERNAME;
  const dbPass = process.env.DB_PASSWORD;
  const dbName = process.env.DB_DATABASE;

  if (!email || !password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  const connection = await mysql.createConnection({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPass,
    database: dbName,
  });

  const [rows] = await connection.execute<any[]>(
    'SELECT id FROM users WHERE email = ?',
    [email],
  );

  if (rows.length > 0) {
    console.log(`Admin user already exists: ${email}`);
    await connection.end();
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);
  await connection.execute(
    `INSERT INTO users (id, firstName, lastName, email, password, isActive, createdAt, updatedAt)
     VALUES (UUID(), ?, ?, ?, ?, true, NOW(), NOW())`,
    ['Admin', 'User', email, hashed],
  );

  console.log(`Seeded admin user: ${email}`);
  await connection.end();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
