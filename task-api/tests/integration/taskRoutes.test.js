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

describe('Task API Integration Tests', () => {
  test('POST /tasks - should create a new task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Integration Task', description: 'Testing POST' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Integration Task');
  });

  test('GET /tasks - should return tasks', async () => {
    await Task.create({ title: 'Sample Task' });
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('PUT /tasks/:id - should update a task', async () => {
    const task = await Task.create({ title: 'Old Title' });
    const res = await request(app).put(`/tasks/${task._id}`).send({ title: 'New Title' });
    expect(res.body.title).toBe('New Title');
  });

  test('DELETE /tasks/:id - should delete a task', async () => {
    const task = await Task.create({ title: 'To Delete' });
    const res = await request(app).delete(`/tasks/${task._id}`);
    expect(res.statusCode).toBe(200);
    const check = await Task.findById(task._id);
    expect(check).toBeNull();
  });
});