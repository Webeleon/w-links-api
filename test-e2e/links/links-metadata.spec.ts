import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getTestingApp } from '../setup';

describe('Links metadata (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getTestingApp();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/links/metadata/types (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      '/links/metadata/link-types',
    );
    expect(status).toBe(200);
    expect(body).toMatchSnapshot();
  });
});
