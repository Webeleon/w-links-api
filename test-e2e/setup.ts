import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { databaseConfig } from '../src/configurations/database.config';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from '../src/users/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export const getTestingApp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(databaseConfig.KEY)
    .useValue({
      type: 'better-sqlite3',
      database: ':memory:',
    })
    .compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  return app;
};

