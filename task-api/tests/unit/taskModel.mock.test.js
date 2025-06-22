jest.mock('../../Task'); // 👈 Tells Jest to auto-mock the module
const Task = require('../../Task');

test('mocked Task.find returns dummy tasks', async () => {
  const dummyTasks = [{ title: 'Mock Task', description: 'Mock Desc' }];
  Task.find.mockResolvedValue(dummyTasks);

  const tasks = await Task.find(); // this won't touch the real DB
  expect(tasks).toEqual(dummyTasks);
});