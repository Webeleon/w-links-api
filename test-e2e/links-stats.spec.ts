import { INestApplication } from '@nestjs/common';
import { getAuthedTestingApp } from './authed-setup';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LinksEntity } from '../src/links/links.entity';
import { Repository } from 'typeorm';
import * as request from 'supertest';

describe('links stats e2e', () => {
  let app: INestApplication;
  let accessToken: string;
  let link: LinksEntity;

  beforeEach(async () => {
    const setup = await getAuthedTestingApp();
    app = setup.app;
    accessToken = setup.accessToken;

    const linkRepo = app.get<Repository<LinksEntity>>(
      getRepositoryToken(LinksEntity),
    );
    link = linkRepo.create({
      target: 'https://webeleon.dev',
      owner: setup.user,
    });
    await linkRepo.save(link);
  });

  afterEach(async () => {
    await app.close();
  });

  it('[GET][200] Stats summary', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app.getHttpServer())
        .get(`/links/${link.uuid}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(302);
    }

    const { status, body } = await request(app.getHttpServer())
      .get(`/statistics/${link.uuid}/summary`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(200);
    expect(body).toStrictEqual({
      clicks: 5,
    });
  });
});
