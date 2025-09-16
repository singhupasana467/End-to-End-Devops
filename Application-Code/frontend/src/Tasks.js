import { Component } from "react";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./services/taskServices";

class Tasks extends Component {
  state = { tasks: [], currentTask: "" };

  async componentDidMount() {
    try {
      const response = await getTasks();
      console.log("Raw response from getTasks:", response);

      const data = response?.data;
      console.log("Extracted data:", data);

      const tasks = Array.isArray(data)
        ? data
        : Array.isArray(data?.tasks)
        ? data.tasks
        : [];

      this.setState({ tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  handleChange = ({ currentTarget: input }) => {
    this.setState({ currentTask: input.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { currentTask, tasks } = this.state;
    if (!currentTask.trim()) return;

    try {
      const { data } = await addTask({ title: currentTask });
      this.setState({
        tasks: Array.isArray(tasks) ? [...tasks, data] : [data],
        currentTask: "",
      });
    } catch (error) {
      console.error("Add task failed:", error);
    }
  };

  handleUpdate = async (taskId) => {
    const originalTasks = Array.isArray(this.state.tasks)
      ? [...this.state.tasks]
      : [];

    try {
      const index = originalTasks.findIndex((task) => task._id === taskId);
      if (index === -1) return;

      const updatedTask = {
        ...originalTasks[index],
        completed: !originalTasks[index].completed,
      };

      await updateTask(taskId, { completed: updatedTask.completed });

      originalTasks[index] = updatedTask;
      this.setState({ tasks: originalTasks });
    } catch (error) {
      console.error("Update task failed:", error);
    }
  };

  handleDelete = async (taskId) => {
    const originalTasks = Array.isArray(this.state.tasks)
      ? [...this.state.tasks]
      : [];

    try {
      await deleteTask(taskId);
      const tasks = originalTasks.filter((task) => task._id !== taskId);
      this.setState({ tasks });
    } catch (error) {
      console.error("Delete task failed:", error);
    }
  };

  render() {
    const { tasks, currentTask } = this.state;
    const safeTasks = Array.isArray(tasks) ? tasks : [];

    return (
      <div>
        <h2>Task List</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={currentTask}
            onChange={this.handleChange}
            placeholder="Enter new task"
          />
          <button type="submit">Add Task</button>
        </form>

        <ul>
          {safeTasks.length > 0 ? (
            safeTasks.map((task) => (
              <li key={task._id}>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => this.handleUpdate(task._id)}
                >
                  {task.title}
                </span>
                <button onClick={() => this.handleDelete(task._id)}>
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li>No tasks available</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Tasks;