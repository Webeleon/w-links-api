import { INestApplication } from '@nestjs/common';
import { getAuthedTestingApp } from './authed-setup';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LinksEntity } from '../src/links/links.entity';
import { Repository } from 'typeorm';
import * as request from 'supertest';

describe('links e2e', () => {
  let app: INestApplication;
  let accessToken: string;
  beforeEach(async () => {
    const setup = await getAuthedTestingApp();
    app = setup.app;
    accessToken = setup.accessToken;

    const linkRepo = app.get<Repository<LinksEntity>>(
      getRepositoryToken(LinksEntity),
    );
    await linkRepo.save(
      linkRepo.create({
        target: 'https://webeleon.dev',
        owner: setup.user,
      }),
    );
  });

  afterEach(async () => {
    await app.close();
  });

  it('update link', async () => {
    const linksResponse = await request(app.getHttpServer())
      .get('/links')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(linksResponse.status).toBe(200);

    const linkUpdateResponse = await request(app.getHttpServer())
      .put(`/links/${linksResponse.body[0].uuid}`)
      .send({
        type: 'linkedin',
      })
      .set('Authorization', `Bearer ${accessToken}`);
    expect(linkUpdateResponse.status).toBe(200);

    const link = await request(app.getHttpServer())
      .get(`/links`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(link.status).toBe(200);
    expect(link.body[0].type).toBe('linkedin');
  });
});
