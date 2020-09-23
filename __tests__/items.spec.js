const supertest = require('supertest');
const server = require('../index');
const db = require('../data/config');
const items = require('../models/items-model');

let token;

const login = async () => {
  await supertest(server).post('/api/auth/register').send({
    username: 'ben',
    password: 'password',
  });
  const response = await supertest(server).post('/api/auth/login').send({
    username: 'ben',
    password: 'password',
  });
  token = response.body.token;
};

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
    const res = await supertest(server).get(`/api/items/${item.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.name).toBe('bowl');
  });

  it('POST /items - creates a new item', async () => {
    const item = {
      name: 'Galaxy 5',
      description: 'A galaxy phone',
      price: 1000,
    };

    await login();
    const res = await supertest(server)
      .post('/api/items')
      .send({ item, token });
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe('application/json');
    expect(res.body.name).toBe('Galaxy 5');
  });

  it('PUT /items/:id - updates an item', async () => {
    await login();
    const itemToUpdate = await items.findOne();
    console.log(itemToUpdate);
    const itemUpdates = { name: 'Galaxy 6' };
    const res = await supertest(server)
      .put(`/api/items/${itemToUpdate.id}`)
      .send({ token: token, item: itemUpdates });
    const updatedItem = await items.findById(itemToUpdate.id);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(200);
    expect(updatedItem.name).toBe('Galaxy 6');
  });

  it('DELETE /items/:id - deletes an item', async () => {
    await login();
    const itemToDelete = await items.findOne();
    await supertest(server)
      .delete(`/api/items/${itemToDelete.id}`)
      .send({ token });
    const itemsList = await items.find();
    expect(itemsList.length).toBe(2);
  });
});
