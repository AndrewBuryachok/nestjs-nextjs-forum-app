import { DataSource, type DataSourceOptions } from 'typeorm';
import { type SeederOptions } from 'typeorm-extension';
import dotenv from 'dotenv';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/features/**/*.entity{.ts,.js}'],
  seeds: ['src/database/seeds/**/*.seeder{.ts,.js}'],
  factories: ['src/database/factories/**/*.factory{.ts,.js}'],
  synchronize: true,
  ssl: true,
};

export const dataSource = new DataSource(options);
