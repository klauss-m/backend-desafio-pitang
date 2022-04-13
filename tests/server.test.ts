import supertest from 'supertest';
import { server } from '../src/server';

describe('server.ts', () => {
  it('healthcheck', async () => {
    const unit = supertest(server);
    const result = await unit.get('/healthcheck');
    expect(result.statusCode).toBe(200);
    expect(JSON.stringify(result.body)).toEqual(JSON.stringify({ message: 'ok' }));
  });
});
