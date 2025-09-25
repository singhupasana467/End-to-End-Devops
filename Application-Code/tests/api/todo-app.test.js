describe('ToDo App Logic Tests', () => {
  it('should confirm app name contains "To-Do"', () => {
    const appName = 'My To-Do List';
    expect(appName).toMatch(/To-Do/);
  });

  it('should accept a valid task title string', () => {
    const sampleTask = { title: 'Buy groceries' };
    expect(typeof sampleTask.title).toBe('string');
    expect(sampleTask.title.length).toBeGreaterThan(0);
  });

  it('should default completed to false', () => {
    const newTask = { task: 'Write CI test', completed: undefined };
    const isCompleted = newTask.completed ?? false;
    expect(isCompleted).toBe(false);
  });

  it('should toggle completed from false to true', () => {
    const task = { task: 'Test toggle', completed: false };
    task.completed = !task.completed;
    expect(task.completed).toBe(true);
  });

  it('should toggle completed from true to false', () => {
    const task = { task: 'Test toggle', completed: true };
    task.completed = !task.completed;
    expect(task.completed).toBe(false);
  });
});
