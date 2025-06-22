const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app, connectDB } = require('../../index');
const Task = require('../../Task');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

afterEach(async () => {
  await Task.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('API Endpoint Tests', () => {
  test('GET /tasks returns JSON and 200', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tasks with missing title returns 400', async () => {
    const res = await request(app).post('/tasks').send({ description: 'Missing title field' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('DELETE /tasks/:id with invalid ID returns 400', async () => {
    const res = await request(app).delete('/tasks/invalid-id');
    expect(res.statusCode).toBe(400);
  });
});