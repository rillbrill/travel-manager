import { resolve } from 'path';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ path: resolve(__dirname, `../.${process.env.NODE_ENV}.env`) });

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [resolve(__dirname, 'migrations/*.ts')],
  charset: 'utf8mb4_general_ci',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
});

export default dataSource;
