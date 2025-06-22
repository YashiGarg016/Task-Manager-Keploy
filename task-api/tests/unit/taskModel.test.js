const mongoose = require('mongoose');
const Task = require('../../Task');

describe('Task Model Unit Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a task with title and description', async () => {
    const task = new Task({ title: 'Unit Test', description: 'Testing Task model' });
    const savedTask = await task.save();

    expect(savedTask._id).toBeDefined();
    expect(savedTask.title).toBe('Unit Test');
    expect(savedTask.description).toBe('Testing Task model');
  });

  it('should create a task with only title', async () => {
    const task = new Task({ title: 'Title Only' });
    const savedTask = await task.save();

    expect(savedTask.title).toBe('Title Only');
    expect(savedTask.description).toBeUndefined();
  });
});