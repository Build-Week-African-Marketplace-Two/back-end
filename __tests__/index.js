const supertest = require('supertest');
const server = require('../index');
const db = require('../data/config');
const itemsModel = require('../models/items-model');
const { expectCt } = require('helmet');

beforeEach(async () => {
  return db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('integration tests', () => {
  it('GET /items - get a list of items', async () => {
    const res = await supertest(server).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.length).toBeGreaterThanOrEqual(3);
    expect(res.body[0].name).toBe('bowl');
  });
});
