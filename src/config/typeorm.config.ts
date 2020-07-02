import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  port: 54320,
  password: 'postgres',
  database: 'taskmanager',
  entities: [`${__dirname}/../**/*.entity.ts`],
};
