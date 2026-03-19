import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env' });

const isCompiled = path.extname(__filename) === '.js';

const entities = isCompiled ? ['dist/**/*.entity.js'] : ['src/**/*.entity.ts'];
const migrations = isCompiled ? ['dist/migrations/*.js'] : ['src/migrations/*.ts'];

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'pap',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: false,
  entities,
  migrations,
});

// Default and named exports for ES modules
export default AppDataSource;
export { AppDataSource };
// CommonJS compatibility: ensure TypeORM CLI (require) can access the DataSource
/* eslint-disable @typescript-eslint/no-explicit-any */
(module as any).exports = AppDataSource;
(module as any).exports.default = AppDataSource;
(module as any).exports.AppDataSource = AppDataSource;
// Provide a named export `dataSource` which some CLI variants expect
export const dataSource = AppDataSource;
