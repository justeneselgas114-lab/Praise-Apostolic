const { DataSource } = require('typeorm');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'pap',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: false,
  entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
  migrations: ['src/migrations/*.ts', 'dist/migrations/*.js'],
});

module.exports = AppDataSource;
module.exports.dataSource = AppDataSource;
module.exports.AppDataSource = AppDataSource;
