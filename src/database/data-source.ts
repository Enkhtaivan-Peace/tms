import { WorkTypeEntity } from 'src/features/work/work-type/entities/work-type.entity';
import { DataSource } from 'typeorm';
import 'dotenv/config';
export const AppDataSource = new DataSource({
  type: 'mysql',

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  username: process.env.DB_USERNAME,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_DATABASE,

  entities: [WorkTypeEntity],

  migrations: ['src/database/migrations/*.ts'],
});
