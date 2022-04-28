import { INestApplication } from '@nestjs/common';
import { getTestingApp } from './setup';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UsersEntity } from '../src/users/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

describe('User (e2e)', () => {
  let app: INestApplication;
  let token: string;

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
    ]);

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@test.test',
        password: 'test',
      });

    token = body.access_token;
  });

  afterEach(async () => {
    await app.close();
  });

  it('[GET][200] /users/profile', async () => {
    const { status } = await request(app.getHttpServer())
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });

  it('[GET][403] /users/profile', () => {
    return request(app.getHttpServer()).get('/users/profile').expect(401);
  });
});
