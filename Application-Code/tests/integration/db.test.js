// tests/integration/db.test.js
const mongoose = require('mongoose');
const Task = require('../models/Task');

describe('MongoDB Integration', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/testdb');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should save and retrieve a task', async () => {
    const task = new Task({ task: 'Integration test', completed: false });
    await task.save();

    const found = await Task.findOne({ task: 'Integration test' });
    expect(found.completed).toBe(false);
  });
});
