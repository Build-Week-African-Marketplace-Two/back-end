const supertest = require('supertest');
const server = require('../index');
const db = require('../data/config');

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
});
