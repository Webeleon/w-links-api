import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { databaseConfig } from '../src/configurations/database.config';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from '../src/users/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

export const getAuthedTestingApp = async (): Promise<{
  app: INestApplication;
  accessToken: string;
  user: UsersEntity;
}> => {
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

  const userRepo = app.get<Repository<UsersEntity>>(
    getRepositoryToken(UsersEntity),
  );
  const user = userRepo.create({
    username: 'test',
    email: 'test@test.test',
    passwordHash:
      '$2b$10$smnFMBktk2pI8/gbhw4xIOabd4M5WDcQhe31Vzd9bUF5uuXM3LZuS',
    active: true,
  });
  await userRepo.save(user);

  const { status, body } = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      email: 'test@test.test',
      password: 'coco',
    });

  expect(status).toBe(200);

  return {
    app,
    accessToken: body.access_token,
    user,
  };
};
