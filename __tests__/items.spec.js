const supertest = require('supertest');
const server = require('../index');
const db = require('../data/config');
const itemsModel = require('../models/items-model');
const usersModel = require('../models/users-model');
const { expectCt } = require('helmet');

let token;

const login = async () => {
  await supertest(server).post('/api/auth/register').send({
    username: 'non admin user',
    password: 'password',
  });
  const response = await supertest(server).post('/api/auth/login').send({
    username: 'non admin user',
    password: 'password',
  });
  token = response.body.token;
};

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

  it('POST /api/auth/register - register a user', async () => {
    const user = { username: 'josh', password: 'password' };
    const res = await supertest(server).post('/api/auth/register').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.message).toBe('User created');
  });

  it('POST /api/auth/login - log a user in', async () => {
    const user = { username: 'josh', password: 'password' };
    await supertest(server).post('/api/auth/register').send(user);

    const res = await supertest(server).post('/api/auth/login').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.message).toBe('Welcome josh');
  });

  it('GET /api/users - get a list of users if logged in', async () => {
    await login();
    const res = await supertest(server).get('/api/users').send({ token });
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body[0].username).toBe('ben99');
  });

  it("GET /api/users - can't see users if not logged in", async () => {
    const res = await supertest(server).get('/api/users');
    expect(res.statusCode).toBe(401);
    expect(res.type).toBe('application/json');
    expect(res.body.err).toBe('Invalid Credentials');
  });

  it("POST /api/auth/login - can't login with bad password", async () => {
    const user = { username: 'josh', password: 'badpassword' };
    const res = await supertest(server).post('/api/auth/login').send(user);
    expect(res.statusCode).toBe(401);
    expect(res.type).toBe('application/json');
  });

  it("POST /api/auth/register - can't register with duplicate username", async () => {
    const user = { username: 'josh', password: 'badpassword' };
    const duplicateUser = { username: 'josh', password: 'duplicateuser' };

    await supertest(server).post('/api/auth/register').send(user);
    const res = await supertest(server)
      .post('/api/auth/register')
      .send(duplicateUser);
    expect(res.statusCode).toBe(400);
    expect(res.type).toBe('application/json');
    expect(res.body.message).toBe('User already exists');
  });
});
