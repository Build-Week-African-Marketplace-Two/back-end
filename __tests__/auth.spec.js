const supertest = require('supertest');
const server = require('../index');
const db = require('../data/config');

beforeEach(async () => {
  await db.migrate.latest();
  return db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('integration tests', () => {
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
