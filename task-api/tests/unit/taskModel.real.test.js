const mongoose = require('mongoose');
const Task = require('../../Task');

describe('Real DB Task Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testDB');
  });

  afterEach(async () => {
    await Task.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  test('real DB: save and retrieve task', async () => {
    const task = new Task({ title: 'Real Task', description: 'Stored in DB' });
    const saved = await task.save();
    expect(saved._id).toBeDefined();

    const found = await Task.findById(saved._id);
    expect(found).not.toBeNull();
    expect(found.title).toBe('Real Task');
    expect(found.description).toBe('Stored in DB');
  }, 10000);
});