// data-source.ts
import { DataSource } from 'typeorm';
import { Task } from './src/tasks/task.entity';
import { User } from './src/users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Task, User],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false // Use migrations in production!
});
