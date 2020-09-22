const supertest = require('supertest');
const server = require('../index');
const db = require('../data/config');
const items = require('../models/items-model');

beforeEach(async () => {
  await db.migrate.latest();
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

  it('GET /items - gets an item by id', async () => {
    const item = await items.findOne();
    console.log(item);
    const res = await supertest(server).get(`/api/items/${item.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.name).toBe('bowl');
  });
});
