import { INestApplication } from '@nestjs/common';
import { getTestingApp } from './setup';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UsersEntity } from '../src/users/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getTestingApp();

    const userRepo = app.get<Repository<UsersEntity>>(
      getRepositoryToken(UsersEntity),
    );

    await userRepo.save([
      userRepo.create({
        username: 'test',
        email: 'test@test.test',
        passwordHash: await bcrypt.hash('test', 10),
        active: true,
      }),
      userRepo.create({
        username: 'inactive',
        email: 'inactive@inactive.inactive',
        passwordHash: await bcrypt.hash('inactive', 10),
      }),
    ]);
  });

  afterEach(async () => {
    await app.close();
  });

  it('[POST][200] /auth/login', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@test.test',
        password: 'test',
      });

    expect(status).toBe(200);
    expect(body.access_token).toBeDefined();
  });

  it('[POST][401] /auth/login', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'nope',
        password: 'nope',
      });

    expect(status).toBe(401);
  });

  it('[POST][403] /auth/login inactive user', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'inactive@inactive.inactive',
        password: 'inactive',
      });

    expect(status).toBe(403);
  });
});
