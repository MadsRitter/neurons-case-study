import request from 'supertest';
import express from 'express';
import { router } from '../src/videoGenerationRouter';

const app = express();
app.use(express.json());
app.use('/', router);

describe('POST /url', () => {
  it('should return 200 for a valid URL', async () => {
    const response = await request(app)
      .post('/url')
      .send({ url: 'https://example.com' });

    expect(response.status).toBe(200);
  });

  it('should return 400 for an invalid URL', async () => {
    const response = await request(app)
      .post('/url')
      .send({ url: 'invalid-url' });

    expect(response.status).toBe(400);
  });

  it('should return 400 for a missing URL', async () => {
    const response = await request(app)
      .post('/url')
      .send({});

    expect(response.status).toBe(400);
  });
});