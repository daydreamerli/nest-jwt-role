import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(<string>process.env.DATABASE_PORT),
  database: process.env.DATABASE_DB,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  // synchronize: process.env.NODE_ENV !== ('production' || 'staging') ? true : false,
  synchronize: true,
  entities: [__dirname + '/../**/entities/*.entity.{ts,js}'],
  autoLoadEntities: true,
};

export const OrmConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  subscribers: [],
  logging: ['error'],
  logger: 'file',
};

export default OrmConfig;