import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { databaseConfig } from '../src/configurations/database.config';
import { INestApplication } from '@nestjs/common';

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
